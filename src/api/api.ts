import { UserLogin, User, Word, UserWord, Auth, Statistic, Settings, Config } from '../types';

const baseUrl = 'https://rslang-team54.herokuapp.com';

const TIME_TO_REFRESH_TOKEN = 10 * 60 * 1000; // 10 min

export class Api {

  userId: string;
  userName: string;
  token: string;
  refreshToken: string;
  tokenExpiresIn: string;

  constructor() {
    this.userId = localStorage.getItem('userId') as string;
    this.userName = localStorage.getItem('userName') as string;
    this.token = localStorage.getItem('token') as string;
    this.refreshToken = localStorage.getItem('refreshToken') as string;
    this.tokenExpiresIn = localStorage.getItem('tokenExpiresIn') as string;
  }

  async createResponse(url: string, method: string, data: User | UserWord | UserLogin | Statistic | Settings | null = null) {
    try {
      const token = await this.getToken();

      const config: Config = {
        method: method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        //body: JSON.stringify(data),
      };
      
      if (data) {
        config.body = JSON.stringify(data);
      }
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error);
      }

      return response.json();
    }
    catch(error) {
      throw error;
    }
  }

  async getWords (page = 0, group = 0) {
    const response = await fetch(
      `${baseUrl}/words?page=${page}&group=${group}`
    );
  
    const content = await response.json();
  
    return content;
  };
  
  async getWordById (wordId: string) {
    const response = await fetch(`${baseUrl}/words/${wordId}`);
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }
  
    const content = await response.json();
  
    return content;
  };

  async loginUser(user: UserLogin) {
    try {
      const response = await fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const content = await response.json();

      this.userId = content.userId;
      this.userName = content.name;
      this.token = content.token;
      this.refreshToken = content.refreshToken;

      this.updateStorage();
      return content;
    }
    catch(error) {
      throw error;
    }
  };


  async createUser(user: User) {
    try {
      const response = await fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const content = await response.json();
      return content;
    }
    catch (error) {
      throw error;
    }
  };

  async getUserById() {
    try {
      const url = `${baseUrl}/users/${this.userId}`;
      const response = await this.createResponse(url, 'GET');
      return response;
    }
    catch(error) {
      throw error;
    }
    /*
    try {
      const response = await fetch(`${baseUrl}/users/${this.userId}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
        },
      });
    
      if (response.status === 401) {
        throw new Error('Access token is missing or invalid');
      } else if (response.status === 404) {
        throw new Error('User not found!');
      } else if (response.status !== 200) {
        throw new Error('Error!');
      }
    
      const user = await response.json();
      return user;
    }
    catch (error) {
      if ((error as Error).message === 'Access token is missing or invalid') {
        const refrsh = await this.getNewTokens();
        console.log(401);
        return this.getUserById();
      }
      console.log(error);
    } */
  }

  async updateUser(user: UserLogin) {
    try {
      const url = `${baseUrl}/users/${this.userId}`;
      const response = await this.createResponse(url, 'PUT', user);
      return response;
    }
    catch(error) {
      throw error;
    }

    /*
    try {
      const response = await fetch(`${baseUrl}/users/${this.userId}`,{
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        throw new Error('Access token is missing or invalid');
      } else if (response.status !== 200) {
        throw new Error('Error!');
      }
    
      const content = await response.json();
      this.userName = content.name;
    
      return content;
    }
    catch(error) {
      if ((error as Error).message === 'Access token is missing or invalid') {
        const refrsh = await this.getNewTokens();
        return this.updateUser(user);
      }
    }*/
  }

  async deleteUser () {
    try {
      const url = `${baseUrl}/users/${this.userId}`;
      const response = await this.createResponse(url, 'DELETE');
      return response;
    }
    catch(error) {
      throw error;
    }
  } 

  async getNewTokens() {
    const response = await fetch(`${baseUrl}/users/${this.userId}/tokens`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.refreshToken}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  
    const content = await response.json();
    this.token = content.token;
    this.refreshToken = content.refreshToken;
    this.updateStorage();
    return content;
  }

  async getAllUserWords() {
    try {
      const url = `${baseUrl}/users/${this.userId}/words`;
      const response = await this.createResponse(url, 'GET');
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async createUserWord(wordId: string, word: UserWord) {

    try {
      const url = `${baseUrl}/users/${this.userId}/words/${wordId}`;
      const response = await this.createResponse(url, 'POST', word);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async getUserWord(wordId: string) {
    try {
      const url = `${baseUrl}/users/${this.userId}/words/${wordId}`;
      const response = await this.createResponse(url, 'GET');
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async updateUserWord(wordId: string, word: UserWord) {
    try {
      const url = `${baseUrl}/users/${this.userId}/words/${wordId}`;
      const response = await this.createResponse(url, 'PUT', word);
      return response;
    }
    catch(error) {
      throw error;
    }
  }


  async deleteUserWord (wordId: string) {
    try {
      const url = `${baseUrl}/users/${this.userId}/words/${wordId}`;
      const response = await this.createResponse(url, 'DELETE');
      return response;
    }
    catch(error) {
      return {};
    }
  }

  async getUserAggregatedWords(params: {}) {
      try {
        let url = `${baseUrl}/users/${this.userId}/aggregatedWords`;

        const queries = Object.entries(params);
        let queriesString = queries.map(([key, value]) => `${key}=${JSON.stringify(value)}`).join('&');

        if (queriesString.length) {
          url += `?${queriesString}`;
        }

        const response = await this.createResponse(url, 'GET');
        return response;
      }
      catch(error) {
        throw error;
      }
  }

  async getUserAggregatedWordById(wordId: string) {

    try {
      const url = `${baseUrl}/users/${this.userId}/aggregatedWords/${wordId}`;
      const response = await this.createResponse(url, 'GET');
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async getUserStatistics() {

    try {
      const url = `${baseUrl}/users/${this.userId}/statistics`;
      const response = await this.createResponse(url, 'GET');
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async upsertUserStatistics(data: Statistic) {

    try {
      const url = `${baseUrl}/users/${this.userId}/statistics`;
      const response = await this.createResponse(url, 'PUT', data);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async getUserSettings() {

    try {
      const url = `${baseUrl}/users/${this.userId}/settings`;
      const response = await this.createResponse(url, 'GET');
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  async upsertUserSettings(settings: Settings) {

    try {
      const url = `${baseUrl}/users/${this.userId}/settings`;
      const response = await this.createResponse(url, 'PUT', settings);
      return response;
    }
    catch(error) {
      throw error;
    }
  }

  updateStorage() {

    this.tokenExpiresIn = this.getExpireTime();
    
    localStorage.setItem('userId', this.userId);
    localStorage.setItem('userName', this.userName);
    localStorage.setItem('token', this.token);
    localStorage.setItem('refreshToken', this.refreshToken);
    localStorage.setItem('tokenExpiresIn', this.tokenExpiresIn);
  }

  parseJwt (token: string) {
    /*
    const data = token.split('.')[1];
    const decodedString = JSON.parse(atob(data));*/
    
    const base64Url = token.split('.')[1];
    if (base64Url === undefined) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  getExpireTime () {
    //const refreshToken = localStorage.getItem('refreshToken') as string;
    const payLoad = this.parseJwt(this.token);
    return payLoad.exp;
  }

  isTokenValid() {

    const expTime = this.getExpireTime() * 1000;

    if (new Date().getTime() + TIME_TO_REFRESH_TOKEN > expTime) {
      return false;
    }

    return true;
  }


  async getToken() {
    //const refreshToken = localStorage.getItem('refreshToken') as string;
    if (this.token && !this.isTokenValid()) {
      await this.getNewTokens();
    }
    return this.token;
  }

}

/*
const getUserById = async (id: string, token: string) => {
  try {
    const response = await fetch(`${baseUrl}/users/${id}`,{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    });
   
    if (response.status === 401) {
      throw new Error('Access token is missing or invalid!');
    } else if (response.status === 404) {
      throw new Error('User not found!');
    } else if (response.status !== 200) {
      throw new Error('Error!');
    }
  
    const user = await response.json();
    return user;
  }
  catch(error) {
    console.log(error);
  }
}

const updateUser = async (id: string, token: string, user: UserLogin) => {
  const response = await fetch(`${baseUrl}/users/${id}`,{
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.status !== 200) {
    const { ErrorDescription } = await response.json();
    throw new Error(ErrorDescription);
  }

  const content = await response.json();

  return content;
}

const getNewTokens = async(id: string, refreshToken: string) => {
  const response = await fetch(`${baseUrl}/users/${id}/tokens`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
      'Accept': 'application/json',
    }
  });
  if (response.status !== 200) {
    const { ErrorDescription } = await response.json();
    throw new Error(ErrorDescription);
  }

  const content = await response.json();

  return content;
}


const getAllUserWords = async(id: string, token: string) => {
  const response = await fetch(`${baseUrl}/users/${id}/words`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  if (response.status !== 200) {
    const { ErrorDescription } = await response.json();
    throw new Error(ErrorDescription);
  }

  const content = await response.json();

  return content;
}

const createUserWord = async (userId: string, wordId: string, token: string, word: UserWord) => {
  const response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`,{
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  if (response.status !== 200) {
    const { ErrorDescription } = await response.json();
    throw new Error(ErrorDescription);
  }

  const content = await response.json();

  return content;
}

const getUserWord = async(userId: string, wordId: string, token: string) => {
  const response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`,{
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    }
  });
  if (response.status !== 200) {
    const { ErrorDescription } = await response.json();
    throw new Error(ErrorDescription);
  }

  const content = await response.json();

  return content;
}

const updateUserWord = async (userId: string, wordId: string, token: string, word: UserWord) => {
  const response = await fetch(`${baseUrl}/users/${userId}/words/${wordId}`,{
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });

  if (response.status !== 200) {
    const { ErrorDescription } = await response.json();
    throw new Error(ErrorDescription);
  }

  const content = await response.json();

  return content;
} */


