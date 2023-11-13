/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import DarkModeComponent from '../components/DarkModeComponent'
import BackComponent from '../components/BackComponent'
import { Col, Container, Figure, Image, Row } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { AiOutlineEye } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import { AuthUtils } from './../../utils/auth/authUtils';
import { userUtils } from './../../utils/auth/user/userUtils';



function UserPage() {

  const { isDarkMode } = useContext(DarkModeContext)
  const { userData } = AuthUtils();    
  const {editMode, toggleEditMode, saveChanges, getInputProps, getRootProps, profileImage} = userUtils();
  
  return (
    <section className='mt-5 p-2'>
      <div className='absolute right-3 mr-5'>
        <DarkModeComponent />
      </div>
      <div className='absolute left-3 m-3 '>
        <BackComponent />
      </div>

      <Container className={isDarkMode ? 'bg-slate-700 rounded p-5' : 'bg-white rounded p-5'} fluid>
        <Row>
          <Col sm className='mb-4'>
            {FirstUserCol()}
          </Col>
          <Col sm>
            {SecondUserCol()}
          </Col>
        </Row>

      </Container>
    </section>
  )

  function FirstUserCol() {
    return <Row>
      <Col sm>
        <div className='flex flex-row justify-center content-center items-center gap-2'>
          {editMode ? (
            <>

              <div {...getRootProps()} className='dropzone'>
                <input {...getInputProps()} />
                {profileImage ? (
                  <Container>
                    <Image src={URL.createObjectURL(profileImage)} className='UserIMG' roundedCircle />
                  </Container>
                ) : (
                  <>
                    <Figure>
                      <Figure.Image src={'https://media.istockphoto.com/id/931778082/vector/download-button-vector-icon.jpg?s=612x612&w=0&k=20&c=-SWrynGUHE9RX5j1IfqyDGREWnV4uUIGWodUiY3xdBs='} roundedCircle className='UserIMG'/>
                    </Figure>
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
              <Figure className='bg-orange_primary hover:bg-orange_secondary p-1 rounded-circle text-light position-absolute top-24' onClick={toggleEditMode}>
                <BsFillPencilFill className='m-1' />
              </Figure>
              <Image src={userData?.imageLink ? userData.imageLink : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'} roundedCircle className='UserIMG' width='80' height='80' />
            </div>
          )}
          <div className='flex flex-col'>
            <span className={isDarkMode ? 'text-xl text-white' : 'text-xl text-slate-700'}> {userData?.name} </span>
            <span className={isDarkMode ? 'text-stone-400' : ' text-slate-700'}> 17/02/2023 </span>
          </div>
        </div>
        <div className='mt-5 flex flex-col justify-center content-center items-center gap-3' hidden={!editMode}>
          <button className={isDarkMode ? 'bg-orange_primary text-light p-2 rounded-lg hover:bg-orange_secondary animate__animated animate__fadeIn' : 'bg-orange_primary border-1 text-light p-2 rounded-lg hover:bg-orange_secondary animate__animated animate__fadeIn'} onClick={saveChanges}>
            Salvar Alterações
          </button>

          <button className={isDarkMode ? 'bg-red-600 text-light p-2 rounded-lg hover:bg-orange_secondary animate__animated animate__fadeIn' : 'bg-red-500 border-1 text-light p-2 rounded-lg hover:bg-red-700 animate__animated animate__fadeIn'} onClick={toggleEditMode}>
            Descartar Alterações
          </button>
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

export default UserPage