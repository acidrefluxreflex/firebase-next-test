import { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import { Restaurant } from "../@types/Restaurants";

type TASKSTATE = {
  id: string;
  title: string;
}[];

const Index: NextPage = () => {
  const [tasks, setTasks] = useState<TASKSTATE>([{ id: "", title: "" }]);
  const [isFetch, setIsFetch] = useState<Boolean>(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const insertUser = async () => {
    await axios.post("/api/restaurants");
  };

  const getUser = async () => {
    await axios.get<Restaurant>("/api/restaurants").then((res) => {
      console.log(res.data);
      setRestaurants([res.data]);
    });
  };

  const handleOnSubmit = async () => {
    await axios
      .get<Restaurant>("/api/restaurants")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Firestoreのデータを取得;

  if (!isFetch) {
    return (
      <div>
        <p>test</p>
        <p>{restaurants.length}</p>
        <button onClick={insertUser}>fetch</button>
        <button onClick={() => getUser()}>Get User</button>
      </div>
    );
  }

  return (
    <>
      <h2>タスク読み込み</h2>
      <button onClick={insertUser}>fetch</button>
      <ul>
        {tasks.map((task, index) => {
          return <li key={task.id}>{task.title}</li>;
        })}
      </ul>
    </>
  );
};

export default Index;
