import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharInfo } from '../../redux/slices/charSlice';
import { fetchComicInfo } from '../../redux/slices/comicSlice';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';

const getContent = setContent('single');

const SinglePage = ({Component, dataType}) => {
        const dispatch = useDispatch();
        const {comicData, comicLoadingStatus, comicId} = useSelector(state => state.comic);
        const {charData, charLoadingStatus, charId} = useSelector(state => state.char);

        const {id} = useParams();
        const [data, setData] = useState(null);
        const [status, setStatus] = useState('idle');
        const {loading, error, process, setProcess, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id, comicId, charId])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    // dispatch(fetchComicInfo(id));
                    onDataLoaded(comicData);
                    setStatus(comicLoadingStatus);
                    // getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                case 'character':
                    // dispatch(fetchCharInfo(id));
                    onDataLoaded(charData);
                    setStatus(charLoadingStatus);
                    // getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {getContent(status, Component, data)}
            </>
        )
}

export default SinglePage;