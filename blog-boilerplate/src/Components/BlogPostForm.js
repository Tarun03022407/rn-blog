import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";

const BlogPostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState(initialValues.title);
  const [content, setContent] = useState(initialValues.content);
  return (
    <View>
      <Text style={styles.label}>Enter title :</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(newText) => setTitle(newText)}
      />

      <Text style={styles.label}>Enter content :</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(newContent) => setContent(newContent)}
      />
      <Button
        onPress={() => {
          onSubmit(title, content);
        }}
        title="Save Blog Post"
      />
    </View>
  );
};

BlogPostForm.defaultProps = {
  initialValues: {
    title: "",
    content: "",
  },
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default BlogPostForm;
