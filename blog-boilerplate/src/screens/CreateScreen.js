import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../Context/BlogContext";

import BlogPostForm from "../Components/BlogPostForm";
const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);

  return (
    <>
      <BlogPostForm  onSubmit = {(title,content)=>{
        addBlogPost(title,content,()=>navigation.navigate('Index'))
      }} />
    </>
  );
};

const styles = StyleSheet.create({});
export default CreateScreen;
