import React from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteCandidate, createCandidateSurvey } from "../../redux";
import columns from "./columns";

const CandidatesTable = ({ candidates }) => {

	const dispatch = useDispatch();
	const token = useSelector((state) => state.admin.token);
	//add action column to delete candidate
	//(it cannot be added outside react component (column.js isn't one),
	// so we just add it here ONCE instead of declaring whole column array here)
	if (columns.length === 5) {
		columns.push({
			title: "Action",
			render: ({ id }) => {
				return (
					<p
						style={{ color: "blue", cursor: "pointer" }}
						onClick={() => dispatch(deleteCandidate(id, token))}
					>
						Delete
					</p>
				);
			},
		});
		columns.push({
			title: "Survey",
			render: ({ id, url, results }) => {
				return url ? (
					results ? (
						<div>
							<p>Points: {results}</p>{" "}
							<p>Self-Esteem: {results<15 ? "Low" : results<26 ? "Normal": "High"}</p>
						</div>
					) : (
						<div>Survey not taken yet</div>
					)
				) : (
					<p
						style={{ color: "blue", cursor: "pointer" }}
						onClick={() => dispatch(createCandidateSurvey(id, token))}
					>
						Create new survey
					</p>
				);
			},
		});
	}

	return candidates && candidates.length ? (
		<Table rowKey="id" columns={columns} dataSource={candidates} />
	) : (
		<h2>No candidates to show</h2>
	);
};

export default CandidatesTable;
