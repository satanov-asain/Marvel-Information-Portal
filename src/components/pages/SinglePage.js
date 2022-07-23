import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useMarvelService from '../../services/MarvelService';
import AppBanner from "../appBanner/AppBanner";
import setContent from '../../utils/setContent';

const getContent = setContent('single');

const SinglePage = ({Component, dataType}) => {
        const {comicData, comicLoadingStatus, comicId} = useSelector(state => state.comic);
        const {searchCharData, searchCharLoadingStatus, searchCharId} = useSelector(state => state.char);

        const [data, setData] = useState(null);
        const [status, setStatus] = useState('idle');

        useEffect(() => {
            updateData()
        }, [comicId, searchCharId])

        const updateData = () => {
            switch (dataType) {
                case 'comic':
                    onDataLoaded(comicData);
                    setStatus(comicLoadingStatus);
                    break;
                case 'character':
                    onDataLoaded(searchCharData);
                    setStatus(searchCharLoadingStatus);
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