import { Pagination, Tab, Tabs, CircularProgress } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { WordCard } from "../../components/Word-card/word-card";
import style from './textbook.scss';
import { useAuth } from "../../hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { setTextbook } from "../../store/slices/textbookSlice";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StoreInterface } from "@store/*";
import { api } from "../../index";

const TABS = [
  {
    id: 1,
    label: 'Раздел 1',
    visible: true,
  },
  {
    id: 2,
    label: 'Раздел 2',
    visible: true,
  },
  {
    id: 3,
    label: 'Раздел 3',
    visible: true,
  },
  {
    id: 4,
    label: 'Раздел 4',
    visible: true,
  },
  {
    id: 5,
    label: 'Раздел 5',
    visible: true,
  },
  {
    id: 6,
    label: 'Раздел 6',
    visible: true,
  },
  {
    id: 7,
    label: 'Сложные слова',
    visible: false,
  }
]

export interface WordsInterface {
  [key: string] : string | {difficulty: string} | number;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  _id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  userWord: {difficulty: string};
}

interface IUserWordsId {
  id: string;
  difficulty: string;
  wordId: string;
}

const TextbookPage = () => {
  const [isFetching, setFetching] = React.useState(false);
  const navigate = useNavigate();
  const { tab = 0, page = 1 } = useParams();
  const [value, setValue] = useState(Number(tab));
  const [total, setTotal] = useState(0);

  const user = useSelector((state: StoreInterface) => state.user);
  const {words} = useSelector((state: StoreInterface) => state.textbook);

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#c6d6f6',
      },
    },
  });

  const paginationColor = useMemo(() => {
    return words.every(({ userWord }: any) => userWord && userWord.difficulty === 'study')
      ? 'secondary'
      : 'standard';
  }, [words]);

  const dispatch = useDispatch();

  const auth = useAuth();

  const fetchWords = React.useCallback(async () => {
    try {
      setFetching(true)
      const response = await api.getWords(Number(page) - 1, value);
      dispatch(setTextbook({words: response}));
    } catch (e) {
      navigate('login');
      throw e;
    } finally {
      setFetching(false);
    }

  }, [value, page]);

  const fetchUserWords = React.useCallback(async () => {
    try {
    setFetching(true)

    let response = [];
    let total = 0;

    if(Number(value) === 6) {
      const [{ paginatedResults, totalCount: [{ count } = {count: 0}] }] = await api.getUserAggregatedWords({
        page: Number(page) - 1,
        wordsPerPage: 20,
        filter: {'$and':[{"userWord.difficulty":"hard"}]},
      });

      response = paginatedResults;
      total = count;
    } else {
      const [{ paginatedResults, totalCount: [{ count } = {count: 0}] }] = await api.getUserAggregatedWords({
        page: Number(page) - 1,
        group: value,
        wordsPerPage: 20,
        filter: Number(value) === 6 ? {'$or':[{'userWord.difficulty':'normal'},{"userWord.difficulty":"hard"}]} : {},
      });

      response = paginatedResults;
      total = count;

    }
    
    dispatch(setTextbook({words: response}));
    setTotal(total);
  } catch (e) {
    navigate('login');
    throw e;
  } finally {
    setFetching(false);
  }
  }, [value, page]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(`/textbook/${newValue}`);
  };

  const onSavanna = () => {
    navigate('/games/savanna')
  }

  const onSprint = () => {
    navigate('/games/sprint')
  }

  const onAudiocall = () => {
    navigate('/games/audiocall')
  }

  React.useEffect(() => {
    if (user.id) {
      fetchUserWords();
    } else {
      fetchWords();
    }

  }, [tab, page]);

  return (
    <div className={style.MainContainer}>
      <h2 className={style.textbookTitle}>Учебник</h2>
      <div className={style.gameBtnsContainer}>
        <button onClick={onAudiocall} className={style.gamesBtn}>Аудиовызов</button>
        <button onClick={onSprint} className={style.gamesBtn}>Спринт</button>
        <button onClick={onSavanna} className={style.gamesBtn}>Саванна</button>
      </div>
      <Tabs 
        value={value}
        onChange={handleChange} 
        aria-label="basic tabs example"
        sx={{
          mb: 4,
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundColor: '#00000099',
          borderRadius: '17px',
          }}>
        {TABS.map(({label, id, visible}) => (auth.isAuth || visible)
          ? <Tab sx={{color: '#fff'}} key={`simple-tab-${id}`} label={label} id={`simple-tab-${id}`} aria-controls={`simple-tabpanel-${id}`}/>
          : null)}
      </Tabs>
      <div className={style.paginationContainer}>
      <ThemeProvider theme={theme}>
        <Pagination color={paginationColor} page={Number(page)} count={auth.isAuth ? Math.ceil(total / 20) : 30} onChange={(e, pageNum) => navigate(`/textbook/${value}/${pageNum}`)} />
      </ThemeProvider>
      </div> 
      <div>
        {
        isFetching && 
        <div className={style.progressCenter}>
          <CircularProgress size={80} sx={{position: "absolute"}} />
        </div>
        }
      
        {
          words.map((v: WordsInterface) => 
          <WordCard key={v.id || v._id} 
            imgSrc={v.image} 
            word={v.word} 
            trnscr={v.transcription} 
            trnslt={v.wordTranslate}
            txtMeaning={v.textMeaning}
            txtExample={v.textExample}
            txtMeaningTranslt = {v.textMeaningTranslate}
            txtExampleTrslt = {v.textExampleTranslate}
            audio={v.audio}
            audioExample={v.audioExample}
            audioMeaning={v.audioMeaning}
            id={v.id || v._id}
            userWord={v.userWord}
            tab={value}
            fetchWords={fetchUserWords}
            />
          )
        }
      </div>
     
    </div>
  )
}

export default TextbookPage