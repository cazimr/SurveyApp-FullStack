import React, {useEffect} from "react";
import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import {useHistory} from 'react-router-dom';
import Admin from "../../components/Admin";
import CandidatesTable from "../../components/CandidatesTable";
import {getCandidates} from '../../redux';
import {StyledButton} from '../../components/StyledComponents/authStyle';
import * as style from "./style";

const CandidatesPage = () => {
	const admin = useSelector(state=>state.admin);
	const { name, email, picture } = admin.data;
	const candidates = useSelector(state=>state.candidates.data);
	const dispatch = useDispatch();
	const history = useHistory();
	useEffect(()=>{
		dispatch(getCandidates(admin.token));
	},[dispatch,admin.token])

	return (
		<Layout>
			<style.AdminContainer>
                 <style.StyledPageTitle>Candidates Page</style.StyledPageTitle>
				<Admin name={name} email={email} picture={picture}/>
			</style.AdminContainer>
			<StyledButton onClick={(e)=>history.push("/newCandidate")}>Add candidate</StyledButton>
			{candidates &&  <CandidatesTable candidates={candidates} /> }
		</Layout>
	);
};

export default CandidatesPage;
