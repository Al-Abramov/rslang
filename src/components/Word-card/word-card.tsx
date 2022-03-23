import { Button, Card, CardMedia, IconButton, Stack } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import React, { useState } from "react";
import { FC } from "react";
import style from './word-card.scss';
import { useDispatch, useSelector } from "react-redux";
import { setWordById, removeWord } from "../../store/slices/textbookSlice";
import { useAuth } from "../../hooks/use-auth";
import { api } from "../../index";

interface WordCardProps {
  imgSrc: string;
  word: string;
  trnscr: string;
  trnslt: string;
  txtMeaning: string;
  txtMeaningTranslt: string;
  txtExample: string;
  txtExampleTrslt: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  id: string;
  userWord: {difficulty: string};
  tab: number;
  fetchWords: () => void;
}

const player = new Audio();

function audioIterator(array: string[]){
  let nextIndex = 0;

  return {
     next: function() {
         return nextIndex < array.length ?
             {value: array[nextIndex++], done: false} :
             {done: true};
     }
  }
}

export const WordCard: FC<WordCardProps> = ({
  id, imgSrc, word, trnscr, trnslt, txtMeaning, txtExample, txtExampleTrslt, 
  txtMeaningTranslt, audio, audioExample, audioMeaning, userWord, tab, fetchWords
}) => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const [isPlay, setIsPlay] = useState(false);

  const playAudio = () => {
    const audioList = audioIterator([
      'https://rslang-team54.herokuapp.com/' + audio,
      'https://rslang-team54.herokuapp.com/' + audioMeaning,
      'https://rslang-team54.herokuapp.com/' + audioExample,
    ]);

    const initialAudio = audioList.next().value || '';
    player.src = initialAudio;

    player.onended = () => {
      const { done, value } = audioList.next();

      if (!done) {
        player.src = value || '';
        player.play();
      } else {
        player.pause()
        setIsPlay(false);
      }
    }

    if(!isPlay) {
      setIsPlay(true);
      return player.play();
    }
    if(isPlay) {
      setIsPlay(false);
      return player.pause();
    }
  }

  const addToHard = React.useCallback(async () => {
    await api.createUserWord(id, {difficulty: 'hard'});
    dispatch(setWordById({id, difficulty: 'hard'}));
  }, [id]);
  
  const addToStudy = React.useCallback(async () => {
    await api.deleteUserWord(id);
    await api.createUserWord(id, {difficulty: 'study'});
    await fetchWords();
  }, [id, fetchWords]);

  const removeHardCard = React.useCallback(async () => {
    await api.deleteUserWord(id);
    await fetchWords();
  }, [id, fetchWords]);

  const colorHard = '#ff8d8d';
  const colorStudy = '#c6d6f6';
  const colorCard = '#fff';
  return (
    <Card raised={true} sx={
      {
        mb: 5,
        display: "flex",
        background: (userWord && userWord.difficulty === 'hard')
          ? colorHard
          : (userWord && userWord.difficulty === 'study')
            ? colorStudy : colorCard
      }
      }>
      <CardMedia
        component="img"
        sx={{ width: 230, height: 180 }}
        image={`https://rslang-team54.herokuapp.com/${imgSrc}`}
        alt="image"
      />
      <div className={style.innerContainer}>
        <div className={style.df}>
          <div>
            <h3 className={style.wordCardTitle}>{word} - {trnscr}</h3>
            <span className={style.wordCardSubtitle}>{trnslt}</span>
          </div>     
          <IconButton onClick={playAudio} aria-label="play/pause">
            {
            isPlay ? 
            <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />
            }
              
          </IconButton>
          {auth.isAuth ? 
          <Stack spacing={2} direction="row" sx={{alignItems: 'center'}}>
            {
              tab === 6 ? 
              <Button onClick={removeHardCard} variant='contained' sx={{height: '30px'}}>Удалить</Button> :
              <Button onClick={addToHard} disabled={userWord ? true : false} variant={userWord ? 'contained' : 'text'} sx={{height: '30px'}}>Сложное</Button>
            }
            <Button onClick={addToStudy} variant="text" sx={{height: '30px'}}>Изученное</Button>
          </Stack> :
          null
          }

        </div>
        
        <div className={style.subttlContainer}>
          <p className={style.wordCardSubtitle} dangerouslySetInnerHTML={{__html: txtMeaning}}></p>
          <p className={style.wordCardSubtitle__min} dangerouslySetInnerHTML={{__html: txtMeaningTranslt}}></p>
        </div>

        <div className={style.subttlContainer}>
          <p className={style.wordCardSubtitle} dangerouslySetInnerHTML={{__html: txtExample}}></p>
          <p className={style.wordCardSubtitle__min} dangerouslySetInnerHTML={{__html: txtExampleTrslt}}></p>
        </div>       
      </div>
    </Card>
  )
}