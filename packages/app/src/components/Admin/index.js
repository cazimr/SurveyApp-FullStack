import React from "react";
import * as style from "./style";

const Admin = ({ name, email, picture }) => {
	return (
		<style.MainContainer>
			{picture && picture.length ? (
				<style.StyledAvatar src={picture} style={{width:'5em', height:'5em', marginTop: '-0.1em'}}/>
			) : (
				<style.StyledAvatar icon={<style.LargeIcon />} />
			)}

			<style.FlexColumn>
				{name && <style.StyledTitle>{name}</style.StyledTitle>}
				{email && <style.StyledSubTitle>{email}</style.StyledSubTitle>}
			</style.FlexColumn>
		</style.MainContainer>
	);
};

export default Admin;
