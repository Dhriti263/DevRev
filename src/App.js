import { useState } from "react";
import "./App.css";
import { data } from "./users";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function App() {
	const [users, setUsers] = useState(data);
	const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
	const [searchPhrase, setSearchPhrase] = useState("");

	const sortById = () => {
		const usersCopy = [...users];
		usersCopy.sort((userA, userB) => {
			if (sorted.reversed) {
				return userA.id - userB.id;
			}
			return userB.id - userA.id;
		});
		setUsers(usersCopy);
		setSorted({ sorted: "id", reversed: !sorted.reversed });
	};

	const sortByName = () => {
		const usersCopy = [...users];
		usersCopy.sort((userA, userB) => {
			const fullNameA = `${userA.Title} `;
			const fullNameB = `${userB.Title} `;
			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setUsers(usersCopy);
		setSorted({ sorted: "name", reversed: !sorted.reversed });
	};




	const sortBySubject = () => {
		const usersCopy = [...users];
		usersCopy.sort((userA, userB) => {
			const fullNameA = `${userA.Subject} `;
			const fullNameB = `${userB.Subject} `;
			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setUsers(usersCopy);
		setSorted({ sorted: "Subject", reversed: !sorted.reversed });
	};
	
	
        const search = (event) => {
		const matchedUsers = data.filter((user) => {
			return `${user.Title } ` 
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});
        
	

		setUsers(matchedUsers);
		setSearchPhrase(event.target.value);
	};
        
        

	const renderUsers = () => {
		return users.map((user) => {
			return (
				<tr>
					<td>{user.id}</td>
					<td>{`${user.Title} `}</td>
					<td>{user.Subject}</td>
					<td>{user.Author}</td>
					<td>{user.Publish_Date}</td>
				</tr>
			);
		});
	};

	const renderArrow = () => {
		if (sorted.reversed) {
			return <FaArrowUp />;
		}
		return <FaArrowDown />;
	};

	return (
		<div className="App">
			<div className="search-container">
				<input
					type="text"
					placeholder="Search"
					value={searchPhrase}
					onChange={search}
				/>
			</div>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th onClick={sortById}>
								<span style={{ marginRight: 10 }}>Id</span>
								{sorted.sorted === "id" ? renderArrow() : null}
							</th>
							<th onClick={sortByName}>
								<span style={{ marginRight: 10 }}>Books</span>
								{sorted.sorted === "name"
									? renderArrow()
									: null}
							</th>
							<th onClick={sortBySubject}>
								<span style={{ marginRight: 10 }}>Subject</span>
								{sorted.sorted === "Subject"
									? renderArrow()
									: null}
							</th>
							
							
							<th>
								<span>Author</span>
							</th>
							<th>
								<span>Publish_Date</span>
							</th>
						</tr>
					</thead>
					<tbody>{renderUsers()}</tbody>
				</table>
				
			</div>
			<br></br>
			<br></br>
			<br></br>
			<section><b>NOTE - </b>There are five categories of books available in our library and they are -<strong>Novels , Drama , Poetry , Religious and Biography .</strong> Also you can sort datas by clicking on the header(id , Books , Subject).</section>
		</div>
	);
}

export default App;
