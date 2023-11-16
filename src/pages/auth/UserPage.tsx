/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react'
import DarkModeComponent from '../components/DarkModeComponent'
import BackComponent from '../components/BackComponent'
import { Col, Container, Figure, Form, Image, Row } from 'react-bootstrap'
import { DarkModeContext } from '../../utils/context/DarkModeContext'
import { AiOutlineEye } from 'react-icons/ai'
import { BsFillPencilFill, BsSave, BsTrash } from 'react-icons/bs'
import { AuthUtils } from './../../utils/auth/authUtils';
import { userUtils } from './../../utils/auth/user/userUtils';
import PopupComponent from './../components/PopupComponent';
import MDEditor from '@uiw/react-md-editor'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';



function UserPage() {

  const { isDarkMode } = useContext(DarkModeContext)
  const { userData } = AuthUtils();
  const {
    editMode,
    profileImage,
    infoMSG,
    resStatus,
    error,
    show,
    Formik,
    onSubmit,
    initialValues,
    FormValidation,
    toggleEditMode,
    saveChanges,
    getInputProps,
    getRootProps,
  } = userUtils();

  return (
    <section className='mt-5 p-2'>
      <div hidden={!show}>
        {PopupComponent({ title: infoMSG, statusCode: resStatus, error: error })}
      </div>
      <div className='absolute right-3 mr-5'>
        <DarkModeComponent />
      </div>
      <div className='absolute left-3 m-3 '>
        {BackComponent({ href: '/' })}
      </div>

      <Container className={isDarkMode ? 'bg-slate-700 rounded p-5' : 'bg-white rounded p-5'} fluid>
        <Row>
          <Col sm className='mt-3'>
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
    return <>
      {!editMode ? (
        UserInfo()
      ) : (
        EditUserInfo()
      )}
    </>
  }

  function EditUserInfo() {
    return <>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={FormValidation}>
        {({ handleChange, handleSubmit, values }) => (
          <article className='flex flex-row justify-between mt-2 items-center'>
            <Form noValidate onSubmit={handleSubmit}>
              <div className='flex flex-col sm:flex-row content-center items-center align-middle'>
                {PhotoSaving()}
                <div className='flex flex-row gap-2 content-center items-center align-middle'>
                  <div className='flex flex-col'>
                    <span className={isDarkMode ? 'text-xl text-white form-control bg-transparent border-0' : 'text-xl text-slate-700 bg-transparent form-control border-0'}> {userData?.name} </span>
                    <Form.Group controlId='UserRole'>
                      <Form.Control
                        type="text"
                        defaultValue={userData?.role}
                        onChange={handleChange('role')}
                        className={isDarkMode ? 'text-white border-0 bg-transparent mr-16 placeholder:text-slate-50' : 'text-slate-700 bg-transparent border-0'}
                        name="role"
                      />
                    </Form.Group>
                  </div>
                  {actionButtons()}
                </div>
              </div>

              <div className={isDarkMode ? 'text-white bg-white h-0.5 mt-3 mb-2' : 'text-slate-900 bg-slate-900 h-0.5 mt-3 mb-2'}></div>

              <Form.Group controlId='UserBio'>
                <Form.Label className={isDarkMode ? 'text-lg text-white mb-2' : 'text-lg text-slate-700 mb-2'}>Biografia</Form.Label>
                <MDEditor
                  value={values?.biography || userData?.biography}
                  className={isDarkMode ? 'text-white' : 'text-slate-900'}
                  onChange={(value) => { handleChange({ target: { name: 'biography', value } }); }}
                  data-color-mode={isDarkMode ? 'dark' : 'light'}
                  preview='edit'
                />
              </Form.Group>
            </Form>
          </article>
        )}
      </Formik>
    </>
  }

  function UserInfo() {
    return <>
      <article className='flex justify-between mt-2 items-center'>
        <div className='editUserCustom gap-2'>
          <div>
            <Figure className='bg-orange_primary hover:bg-orange_secondary p-1 rounded-circle text-light position-absolute top-28' onClick={toggleEditMode}>
              <BsFillPencilFill className='m-1' />
            </Figure>
            <div className='flex flex-row content-center items-center gap-3'>
              <Image src={userData?.imageLink ? userData.imageLink : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'} roundedCircle className='UserIMG' width='80' height='80' />
            </div>
          </div>
          <div className='flex flex-col'>
            <>
              <span className={isDarkMode ? 'text-xl text-white' : 'text-xl text-slate-700'}> {userData?.name} </span>
              <span className={isDarkMode ? 'text-stone-400' : ' text-slate-700'}> {userData?.role} </span>
            </>
          </div>
        </div>
      </article>
      <div className={isDarkMode ? 'text-white bg-white h-0.5 mt-3 mb-2' : 'text-slate-900 bg-slate-900 h-0.5 mt-3 mb-2'}></div>
      <div className={isDarkMode ? 'prose prose-yellow prose-headings:text-slate-50 user-select-none text-slate-50' : 'prose prose-yellow prose-headings:text-slate-800 user-select-none  text-slate-600'}>
        <ReactMarkdown rehypePlugins={[remarkGfm]}>
          {userData?.biography}
        </ReactMarkdown>
      </div>
    </>
  }

  function actionButtons() {
    return <div className='mt-5 flex flex-col gap-3 m-3' hidden={!editMode}>
      <div className={isDarkMode ? 'bg-orange_primary border-1 w-28 border-orange_primary cursor-pointer flex flex-row gap-2 text-end items-center text-light p-2 rounded-lg hover:bg-orange_secondary animate__animated animate__fadeIn' : 'bg-orange_primary  w-28 cursor-pointer border-1  flex flex-row gap-2 items-center text-light p-2 rounded-lg hover:bg-orange_secondary animate__animated animate__fadeIn'}>
        <button className='flex gap-2 items-center' type='submit' onClick={saveChanges} onClickCapture={() => onSubmit(initialValues)}>
          <BsSave /> Salvar
        </button>
      </div>

      <div onClick={toggleEditMode} className={isDarkMode ? 'bg-red-600 border-1 w-28 border-red-600 cursor-pointer flex flex-row gap-2 items-center text-light p-2 rounded-lg hover:bg-orange_secondary animate__animated animate__fadeIn' : 'border-red-500  w-28 cursor-pointer flex border-1 flex-row gap-2 items-center text-red-700 p-2 rounded-lg hover:bg-red-700 hover:text-white animate__animated animate__fadeIn'}>
        <BsTrash />Descartar
      </div>
    </div>
  }


  function PhotoSaving() {
    return <>
      <div {...getRootProps()} className='dropzone'>
        <input {...getInputProps()} />
        {profileImage ? (
          <Figure>
            <Figure.Image src={URL.createObjectURL(profileImage)} className='UserIMG' roundedCircle />
          </Figure>
        ) : (
          <>
            <Figure>
              <Figure.Image src={'https://archive.org/download/placeholder-image/placeholder-image.jpg'} roundedCircle className='UserIMG' />
            </Figure>
          </>
        )}
      </div>
    </>
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