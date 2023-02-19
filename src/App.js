import React, { useContext, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Event from "./components/event/Event";
import { AuthContext } from "./contexts/authContext";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import NoPage from "./components/NoPage";
import Blog from "./components/blog/Blog";
import Write from "./components/blog/Write";
import Single from "./components/blog/Single";
import Search from "./components/blog/Search";
import WorkingHours from "./components/WorkingHours";
import Todo from "./components/todo/Todo";
import FoodRecipe from "./components/recipe/FoodRecipe";
import Recipe from "./components/recipe/Recipe";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="event" element={<Event />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          {!currentUser && <Route path="login" element={<Login />} />}
          <Route path="register" element={<Register />} />
          <Route path="posts" element={<Blog />} />
          <Route path="posts/write" element={<Write />} />
          <Route path="posts/search" element={<Search />} />
          <Route path="posts/:id" element={<Single />} />
          <Route path="working-hours" element={<WorkingHours/>} />
          <Route path="todo" element={<Todo/>} />
          <Route path="recipe" element={<FoodRecipe/>} />
          <Route path="recipe/:id" element={<Recipe/>} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
