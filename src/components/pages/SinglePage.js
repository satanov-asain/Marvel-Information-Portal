import { useParams } from 'react-router-dom';
import { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';

const getContent = setContent('single');

const SinglePage = ({Component, dataType}) => {
        const {comicData, comicLoadingStatus, comicId} = useSelector(state => state.comic);
        const {singleCharData, singleCharLoadingStatus, singlecharId} = useSelector(state => state.char);

        const [data, setData] = useState(null);
        const [status, setStatus] = useState('idle');

        useLayoutEffect(() => {
            updateData()
        }, [comicId, singlecharId])

        const updateData = () => {
            switch (dataType) {
                case 'comic':
                    onDataLoaded(comicData);
                    setStatus(comicLoadingStatus);
                    break;
                case 'character':
                    onDataLoaded(singleCharData);
                    setStatus(singleCharLoadingStatus);
                    break;
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