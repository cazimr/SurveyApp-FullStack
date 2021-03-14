



const columns = [
	{
		title: "Name",
		dataIndex: "first_name",
		render: (first_name, { last_name }) => {
			return (
				<div>
					{first_name} {last_name}
				</div>
			);
		},
	},
	{
		title: "Email",
		dataIndex: "email",
	},
	{
		title: "Code",
		dataIndex: "code",
	},
	{
		title: "Gender",
		dataIndex: "gender",
	},
	{
		title: "Birth Date",
		dataIndex: "birth_date",
	},
]; 

export default columns;