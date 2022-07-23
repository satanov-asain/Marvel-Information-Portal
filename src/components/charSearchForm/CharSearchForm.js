import {useState, useMemo} from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchChar } from '../../redux/slices/charSlice';

import ErrorMessage from '../errorMessage/ErrorMessage';

import './charSearchForm.scss';


const CharSearchForm = () => {
    const dispatch = useDispatch();
    const {searchCharLoadingStatus, searchCharData} = useSelector(state => state.char);

    const [char, setChar] = useState({});

    const onCharLoaded = (charData) => {
        setChar(charData);
    }

    const updateChar = (name) => {
        dispatch(fetchSearchChar(name));
        if(searchCharData){
            onCharLoaded(searchCharData);
            console.log(searchCharData);
        }
    }

    const results = Object.keys(searchCharData).length===0 ? null : (Object.keys(searchCharData).length!==0 && searchCharLoadingStatus !== 'error')?
                    <div className="char__search-wrapper">
                        <div className="char__search-success">Найден! Посетить страницу {searchCharData.name}?</div>
                        <Link to={`/characters/${searchCharData.id}`} className="button button__secondary">
                            <div className="inner">На страницу</div>
                        </Link>
                    </div> 
                    :<div className="char__search-error">
                        Персонаж не найден или запрос не выполнен. Перепроверьте имя и попробуйте вновь
                    </div>;

    return (
        <div className="char__search-form">
            <Formik
                initialValues = {{
                    charName: ''
                }}
                validationSchema = {Yup.object({
                    charName: Yup.string().required('Это поле обязательно')
                })}
                onSubmit = { ({charName}) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">Или найдите персонажа по имени:</label>
                    <div className="char__search-wrapper">
                        <Field 
                            id="charName" 
                            name='charName' 
                            type='text' 
                            placeholder="Enter name"/>
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={searchCharLoadingStatus==='loading'}>
                            <div className="inner">найти</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
        </div>
    )
}

export default CharSearchForm;