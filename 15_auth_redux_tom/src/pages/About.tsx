import { useDispatch } from "react-redux";
import { showMessage } from "../redux/slices/uxSlice";

const About = () => {
	const dispatch = useDispatch();

	return (
		<div>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum quo
				corporis excepturi itaque culpa reiciendis pariatur sunt odit
				explicabo, alias sed voluptates. Sapiente nulla pariatur similique
				quod excepturi error placeat.
			</p>
			<button onClick={() => dispatch(showMessage(true))}>確認</button>
		</div>
	);
};

export default About;
