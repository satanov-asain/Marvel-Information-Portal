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

        const {id} = useParams();
        const [data, setData] = useState(null);
        const {loading, error, process, setProcess, getComic, getCharacter, clearError} = useMarvelService();

        useEffect(() => {
            updateData()
        }, [id])

        const updateData = () => {
            clearError();

            switch (dataType) {
                case 'comic':
                    dispatch(fetchComicInfo(id));
                    // onDataLoaded(comicData);
                    getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                case 'character':
                    dispatch(fetchCharInfo(id));
                    // onDataLoaded(comicData);
                    getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
            }
        }

        const onDataLoaded = (data) => {
            setData(data);
        }

        return (
            <>
                <AppBanner/>
                {getContent(process, Component, data)}
            </>
        )
}

export default SinglePage;