import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { handleAxiosError } from '@/utils/handleAxiosError';
import { withReauth } from '@/utils/withReauth';
import { useEffect, useRef, useState } from 'react';
import { Id, toast } from 'react-toastify';

type returnTypeHook = {
  isLiking: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.track);
  const { accessToken, refreshToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLiking, setIsLiking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toastLike = useRef<Id | null>(null);

  const toggleLike = () => {
    setIsLiking(true);
    if (!accessToken) {
      return setErrorMsg(
        'Для добавления в избранное необходимо авторизоваться',
      );
    }

    const actionApi = isLike ? removeLike : addLike;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setErrorMsg(null);
    if (track) {
      withReauth(
        (newToken) => actionApi(newToken || accessToken, track._id),
        refreshToken,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          handleAxiosError(error, (msg) => setErrorMsg(msg));
        })
        .finally(() => {
          setIsLiking(false);
        });
    }
  };

  useEffect(() => {
    if (isLiking && !isLike) {
      toastLike.current = toast.info('Добавление в избранное...', {
        position: 'bottom-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        icon: false,
      });
    } else if (isLiking && isLike) {
      toastLike.current = toast.info('Удаление из избранного...', {
        position: 'bottom-right',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        icon: false,
      });
    } else if (errorMsg && toastLike.current) {
      toast.update(toastLike.current, {
        type: 'error',
        render: errorMsg,
        autoClose: 3000,
        hideProgressBar: false,
        icon: null,
      });
    } else if (!isLiking && !errorMsg && toastLike.current) {
      toast.update(toastLike.current, {
        type: 'success',
        render: isLike ? 'Добавлено в избранное' : 'Удалено из избранного',
        autoClose: 3000,
        hideProgressBar: false,
        icon: null,
      });
    }
  }, [errorMsg, isLiking]);

  return {
    isLiking,
    errorMsg,
    toggleLike,
    isLike,
  };
};
