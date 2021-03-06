
import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';
import axios from 'axios';
import { SetRightsForm } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import SingleRightSettings from "./SingleRightSettings";
function RightsSetingForm(props) {

    let rights;
    if (props.rightsSetingForm==='new_chanel'){
    let namesInGroups = [];
    namesInGroups.push(props.selectedGroup.author.name)
    for (let partner of props.selectedGroup.partners) {
        namesInGroups.push(partner.name)
    }
    rights={
        users: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canWrite: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canSeeHistory: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canSendFile: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canAddUsers: {
            witelist:[namesInGroups[0]],
            blacklist: null
        },
        canDeleteUsers: {
            witelist:[namesInGroups[0]],
            blacklist: null
        },
    }
}
if (props.rightsSetingForm==='existing_chanel'){
    rights=props.selectedChanel.rights
}
    return <div style={{height:'100vh'}}>
        <span onClick={()=>{props.SetRightsForm(false)}}>Закрыть</span>
        <h3>Права достуа</h3>
        <ul>
           <SingleRightSettings
           title/>
        </ul>
    </div>
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        rightsSetingForm: state.groups.rightsSetingForm,
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
    }
}
export default connect(mapStateToProps, { SetRightsForm })(RightsSetingForm);