import { socket } from '../../App';
import { io } from "socket.io-client";
import './Chats.css';
import { NavLink } from 'react-router-dom';

function SingleChat(props) {
    let selectCat = () => {
        socket.emit('create', props.group._id);
    }
    return <NavLink to={"/chat/"+props.group._id} activeClassName='active_chat'>
         <li className='im_dialog_wrap' onClick={selectCat}>
        <a className='im_dialog'>
            <div className='im_dialog_meta pull-right text-right'>
                <div className='im_dialog_date'>
                    12:31 AM
                                    </div>
                <span className='im_dialog_badge badge im_dialog_badge_muted'>
                    1
                                    </span>
            </div>
            <div className='im_dialog_photo pull-left peer_photo_init'>
                <span className='peer_initials nocopy im_dialog_photo user_bgcolor_5'>
                    PM
                                    </span>
            </div>
            <div className='im_dialog_message_wrap'>
                <div className='im_dialog_peer'>
                    <span className=''>
                        {props.group.name}
                    </span>
                </div>
                <div>
                    <div className="im_dialog_message">
                        {/* <span>
                            <span>
                                <span className='im_dialog_chat_from_wrap'>
                                    <span className='im_dialog_chat_from'>
                                        Вадим
                                                        </span>
                                    <span>
                                        :
                                                        </span>
                                </span>
                            </span>
                        </span>
                        <span >
                            <span className='im_short_message_text'>
                                а, да это просто задание такое))
                                                </span>
                        </span> */}
                    </div>
                </div>
            </div>
        </a>
    </li>
    </NavLink>
}

export default SingleChat;