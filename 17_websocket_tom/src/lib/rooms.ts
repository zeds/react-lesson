//...

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
	Room,
	User,
} from "../../../../nestjs/07_chatroom_tom/src/shared/interfaces/chat.interface";

export const useRoomsQuery = (roomName: string, isConnected: boolean) => {
	const query = useQuery({
		queryKey: ["rooms", roomName],
		queryFn: (): Promise<Room> =>
			axios
				.get(`http://localhost:3000/api/rooms/${roomName}`)
				.then((response) => response.data),
		refetchInterval: 60000,
		enabled: isConnected,
	});
	return query;
};

export const unsetRoom = () => {
	sessionStorage.removeItem("room");
};
