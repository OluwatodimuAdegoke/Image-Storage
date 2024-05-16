import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import ProgressBar from "../components/ProgressBar";
import Uploading from "../components/Uploading";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { set } from "firebase/database";
import { Video } from "expo-av";

/**
 * Home screen component.
 * Displays a list of uploaded images and videos.
 */
const Home = () => {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // Subscribe to changes in the "files" collection
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New file", change.doc.data());
          setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });

    return () => unsubscribe();
  }, []);

  /**
   * Pick an image from the device's image library.
   */
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      // Upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  };

  /**
   * Upload an image to the Firebase storage.
   * @param {string} uri - The URI of the image file.
   * @param {string} fileType - The type of the file (e.g., "image" or "video").
   */
  const uploadImage = async (uri, fileType) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Media/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // Listen for upload progress events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Progress", progress, "% done");
        setProgress(progress.toFixed());
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Get the download URL of the uploaded file
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // Save the record in the Firestore database
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("");
          setVideo("");
        });
      }
    );
  };

  /**
   * Save a record in the Firestore database.
   * @param {string} fileType - The type of the file (e.g., "image" or "video").
   * @param {string} url - The download URL of the file.
   * @param {string} createdAt - The timestamp when the file was created.
   */
  const saveRecord = async (fileType, url, createdAt) => {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });
      console.log("Document saved correctly", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Pick a video from the device's video library.
   */
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      videoQuality: "low",
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      // Upload the video
      uploadImage(result.assets[0].uri, "video");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View>
        {!images && !videos && <EmptyState />}
        <FlatList
          data={files}
          keyExtractor={(item) => item.url}
          numColumns={3}
          contentContainerStyle={{ gap: 2 }}
          columnWrapperStyle={{ gap: 2 }}
          renderItem={({ item }) => {
            if (item.fileType === "video") {
              return (
                <Video
                  source={{ uri: item.url }}
                  style={{ width: "35%", height: 100 }}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                />
              );
            } else {
              return (
                <Image
                  source={{ uri: item.url }}
                  style={{ width: "35%", height: 100 }}
                />
              );
            }
          }}
        />
      </View>
      {/* <EmptyState /> */}
      {image && <Uploading progress={progress} image={image} video={video} />}

      <TouchableOpacity
        className="absolute justify-center items-center rounded-xl border bottom-10 right-5 w-10 h-10"
        onPress={pickImage}
      >
        <Ionicons name="image" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute justify-center items-center rounded-xl border bottom-24 right-5 w-10 h-10"
        onPress={pickVideo}
      >
        <Ionicons name="videocam" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
