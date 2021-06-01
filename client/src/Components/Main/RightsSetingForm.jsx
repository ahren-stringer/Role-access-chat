
import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SetRightsForm, setSimpleRoles } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import SingleRightSettings from "./SingleRightSettings";
import RightsMenu from "./RightsMenu";
import { chatAPI, rolesAPI } from "../../DAL/api";
function RightsSetingForm(props) {
    let [rename, setRename] = useState(false)
    let [chanelName, setChanelName] = useState(props.selectedChanel.name);

    let chanel;

    if (props.rightsSetingForm === 'existing_chanel') {
        debugger
        chanel = props.selectedChanel
    }
    let [ICS, setICS] = useState(chanel.invitedCanSee)
    useEffect(async () => {
        let res = await rolesAPI.getSimpleRoles(props.selectedGroup._id)
        debugger
        props.setSimpleRoles(res)
    }, [])
    let toggleMenu = (e) => {
        debugger
        e.target.nextElementSibling.classList.toggle('open_menu')
    }
    let invitedCanSee = async(can) => {
        await chatAPI.invited_can_see(props.selectedGroup._id,chanel._id, { invitedCanSee: can })
        setICS(can)
    }

    let renameChanel = async (newName) => {
        await chatAPI.renameChanel(props.selectedGroup._id,props.selectedChanel._id, { name: newName })
        setRename(!rename)
    }

    return <div style={{ height: '100vh' }}>
        <span onClick={() => { props.SetRightsForm(false) }}>Закрыть</span>
        <h3>Права достуа</h3>
        <div>
            <span>Чат под названием:</span>
        {
            (!rename)
                ? <span>
                    <span onDoubleClick={() => { setRename(!rename) }}>{props.selectedChanel.name}</span>
                </span>
                : <span>
                    <input autoFocus={true} onBlur={() => {
                        renameChanel(chanelName)
                    }}
                        onChange={(e) => { setChanelName(e.target.value) }}
                        value={chanelName} />
                </span>
        }
        </div>
        <div>
            {!ICS
                ? <div onClick={() => { invitedCanSee(true) }}>Разрешить просматривать сообщения приглашенным пользователям</div>
                : <div onClick={() => { invitedCanSee(false) }}>Запретить просматривать сообщения приглашенным пользователям</div>
            }
        </div>
        {!props.SimpleRoles ? null : <ul className='role_list'>
            {props.SimpleRoles.map(item =>
                <li className='role_item'>
                    <div className='role_item_name'
                        onClick={(e) => {
                            if (JSON.parse(localStorage.getItem('role')).role === 'owner'
                                || JSON.parse(localStorage.getItem('role')).role === 'admin') toggleMenu(e)
                        }}
                    >
                        {item.user_name}
                    </div>
                    <div className='react-contextmenu'>
                    <RightsMenu
                        rightId={chanel.canSee._id}
                        user_name={item.user_name}
                        rightTitle='Право на посещение'
                        chanel={chanel}
                        right={chanel.canSee}
                        group={props.selectedGroup}
                    />
                    <RightsMenu
                        rightId={chanel.canWrite._id}
                        user_name={item.user_name}
                        rightTitle='Право на отправку'
                        chanel={chanel}
                        right={chanel.canWrite}
                        group={props.selectedGroup}
                    />
                    <RightsMenu
                        rightId={chanel.canSendFile._id}
                        user_name={item.user_name}
                        rightTitle='Право на отправку файлов'
                        chanel={chanel}
                        right={chanel.canSendFile}
                        group={props.selectedGroup}
                    />
                    <RightsMenu
                        rightId={chanel.canSeeHistory._id}
                        user_name={item.user_name}
                        rightTitle='Право на просмотр истории'
                        chanel={chanel}
                        right={chanel.canSeeHistory}
                        group={props.selectedGroup}
                    />
                    </div>
                </li>
            )}
        </ul>}
        {/* <ul>
            <SingleRightSettings
                title='Участники, которым разрешено посещать канал'
                right={chanel.canSee}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
            <SingleRightSettings
                title='Участники, которым отпровлять сообщения'
                right={chanel.canWrite}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
            <SingleRightSettings
                title='Участники, которым разрешено смотреть историю'
                right={chanel.canSeeHistory}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
            <SingleRightSettings
                title='Участники, которым разрешено отправлять файлы'
                right={chanel.canSendFile}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
        </ul> */}
    </div>
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        rightsSetingForm: state.groups.rightsSetingForm,
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
        SimpleRoles: state.groups.SimpleRoles
    }
}
export default connect(mapStateToProps, { SetRightsForm, setSimpleRoles })(RightsSetingForm);