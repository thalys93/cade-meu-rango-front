/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import DarkModeComponent from '../components/DarkModeComponent'
import BackComponent from '../components/BackComponent'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { AiOutlineEye } from 'react-icons/ai'
// import { RecipeUtils } from '../../utils/recipe/recipeUtils'
// import { RecipeAPIModel } from '../../utils/interfaces/Recipes'
import { userUtils } from '../../utils/auth/user/userUtils'
import { ApiUserModel } from '../../utils/interfaces/Users'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'


function PublicUser() {

    const { isDarkMode } = useContext(DarkModeContext)
    // const { recipe } = RecipeUtils();
    const { profile } = userUtils();

    return (
        <section className='mt-5 p-2'>
            <div className='absolute right-3 mr-5'>
                <DarkModeComponent />
            </div>
            <div className='absolute left-3 m-3 '>
                {BackComponent({ href: '/' })}
            </div>

            <Container className={isDarkMode ? 'bg-slate-700 rounded p-5' : 'bg-white rounded p-5'} fluid>

                <Row>
                    <Col sm className='mt-3'>
                        {FirstUserCol(profile as never)}
                    </Col>
                    <Col sm>
                        {SecondUserCol()}
                    </Col>
                </Row>
            </Container>
        </section>
    )

    function FirstUserCol(profile: ApiUserModel) {
        return <Row>
            <Col sm>
                <div className='flex justify-start content-center items-center mt-1'>
                    <div className='flex flex-row content-center items-center gap-3'>
                        <Image src={profile.imageLink ? profile.imageLink : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'}
                            roundedCircle className='UserIMG' width='80' height='80' />
                        <div className='flex flex-col'>
                            <span className={isDarkMode ? 'text-xl text-white' : 'text-xl text-slate-700'}> {profile.name} </span>
                            <span className={isDarkMode ? 'text-stone-400' : ' text-slate-700'}>{profile.role}</span>
                        </div>
                    </div>
                </div>

                <div className={isDarkMode ? 'text-white bg-white h-0.5 mt-3 mb-2' : 'text-slate-900 bg-slate-900 h-0.5 mt-3 mb-2'}></div>

                <div className={isDarkMode ? 'prose prose-yellow prose-headings:text-slate-50 user-select-none text-slate-50' : 'prose prose-yellow prose-headings:text-slate-800 user-select-none  text-slate-600'}>
                    <ReactMarkdown rehypePlugins={[remarkGfm]}>
                        {profile.biography}
                    </ReactMarkdown>
                </div>
            </Col>
        </Row>
    }

    function SecondUserCol() {
        return <Row>
            <Col sm>
                <h1 className={isDarkMode ? 'text-2xl text-white mb-2' : 'text-2xl text-slate-700 mb-2'}> Minhas Receitas </h1>
                <Row>
                    <Col sm>
                        <ol>
                            <li>
                                <div className='flex flex-row gap-2'>
                                    <Image src='https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSWOjtRJTyt3iHScdM_UazRNQuzKtRH9Fsmn0aHKqGmqhd4mSy4J8CBfqv3BzerJY59' height='120' width='120' className={isDarkMode ? 'shadow-md customBorder shadow-slate-900' : 'shadow-md shadow-slate-300 customBorder'} />
                                    <div className='flex flex-col'>
                                        <span className={isDarkMode ? 'text-white' : ' text-slate-700'}> Nome da Receita </span>
                                        <div className={isDarkMode ? 'text-white bg-white h-0.5' : 'text-slate-900 bg-slate-900 h-0.5'}></div>
                                        <span className={isDarkMode ? 'text-white' : ' text-slate-700'}> Data da Criação </span>
                                    </div>
                                    <div className='flex flex-col content-end justify-end m-2'>
                                        <a className='bg-orange_primary p-2 text-white rounded hover:bg-orange_secondary'>
                                            <AiOutlineEye />
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <div className={isDarkMode ? 'text-white bg-white h-0.5 mt-3 mb-3' : 'text-slate-900 bg-slate-900 h-0.5 mt-3 mb-3'}></div>
                            <li>
                                <div className='flex flex-row gap-2'>
                                    <Image src='https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSWOjtRJTyt3iHScdM_UazRNQuzKtRH9Fsmn0aHKqGmqhd4mSy4J8CBfqv3BzerJY59' height='120' width='120' className={isDarkMode ? 'shadow-md customBorder shadow-slate-900' : 'shadow-md shadow-slate-300 customBorder'} />
                                    <div className='flex flex-col'>
                                        <span className={isDarkMode ? 'text-white' : ' text-slate-700'}> Nome da Receita </span>
                                        <div className={isDarkMode ? 'text-white bg-white h-0.5' : 'text-slate-900 bg-slate-900 h-0.5'}></div>
                                        <span className={isDarkMode ? 'text-white' : ' text-slate-700'}> Data da Criação </span>
                                    </div>
                                    <div className='flex flex-col content-end justify-end m-2'>
                                        <a className='bg-orange_primary p-2 text-white rounded hover:bg-orange_secondary'>
                                            <AiOutlineEye />
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ol>
                    </Col>
                </Row>
            </Col>
        </Row>
    }
}

export default PublicUser