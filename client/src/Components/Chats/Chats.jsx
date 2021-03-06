import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Chats.css';
import CreateChanel from './CreateChanel';
import CreateGroup from './CreateGroup';
import Search from './Search';
import SingleChat from './SingleChat';

function Chats(props) {

    useEffect(async () => {
        let req = await axios.get('http://localhost:8001/chanels/' + props.match.params.groupId);
        props.setChanels(req.data)
    }, [props.match.params.groupId])
    // let [groups,setGroups]=useState(null);
    return (
        <div className='im_dialogs_col_wrap noselect'>

            <Search />

            <div className='im_dialogs_col' style={{ height: '100vh' }}>
                <div className='im_dialogs_wrap nano has-scrollbar active-scrollbar'>

                    <div className='im_dialogs_scrollable_wrap nano-content' style={{ right: '-17px' }}>

                        <div>
                            <NavLink to='/users'>Написать</NavLink>
                            <div>
                                {/* <span>
                            Диалоги
                        </span> */}
                                <span>
                                    Группы
                        </span>
                                <CreateGroup author={props.author} />
                                {!props.selectedGroup ? <Preloader /> : <CreateChanel selectedGroup={props.selectedGroup}
                                    SetRightsForm={props.SetRightsForm}
                                    author={props.author}
                                //    rightsSetingForm={props.rightsSetingForm}
                                />}
                            </div>
                        </div>
                        <ul className='nav nav-pills nav-stacked'>
                            {!props.chanels ? <Preloader />
                                : props.chanels.map(item => 
                                <SingleChat
                                    groupId={props.match.params.groupId}
                                    chanel={item}
                                    name={item.name}
                                    SetRightsForm={props.SetRightsForm}
                                    setSelectedChanel={props.setSelectedChanel}
                                />)}
                        </ul>

                    </div>
                    <div className='nano-pane' style={{ display: 'block' }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats;