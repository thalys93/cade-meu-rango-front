import React, { useContext } from 'react'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AuthContext } from './../../utils/context/AuthModeContext';
import { AuthUtils } from './../../utils/auth/authUtils';


function ProfileBadge() {
    
    const authContext = useContext(AuthContext);       
    const {userData} = AuthUtils();


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderTooltip = (props) => {
        return (
            <Tooltip {...props}>
                Meu Perfil
            </Tooltip>
        );
    };         

    return (
        <OverlayTrigger overlay={renderTooltip}>
            <a href={'/protected/user/' + authContext?.user?.uid}>
                <Image src={userData?.profileImage ? userData.profileImage : 'https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg'} roundedCircle
                    width='80' height='80' className='absolute left-11 top-10 border-green-500 border-solid border-2 hover:scale-105 hover:border-cyan-500 UserIMG' />
            </a>
        </OverlayTrigger>
    )
}

export default ProfileBadge;