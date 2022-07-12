import { StatusBar } from "expo-status-bar";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
} from "react-native";
import React, { useState } from "react";

export default function App() {
  const apiurl = "http://www.omdbapi.com/?apikey=3d3797f7";

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;

      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie DB</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.searchbox}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.imdbID)}
          >
            <View style={styles.results}>
              <Image
                source={{ uri: result.Poster }}
                style={{
                  width: "100%",
                  height: 300,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
                resizeMode="stretch"
              />
              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.Title != "undefined"}
      >
        <View style={styles.popup}>
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
          <Text style={{ marginBottom: 20, fontSize: 20 }}>
            {" "}
            Rating: {state.selected.imdbRating}
          </Text>
          <Text style={{ marginBottom: 20 }}>
            Genre: {state.selected.Genre}
          </Text>
          <Text style={styles.director}>
            Director: {state.selected.Director}
          </Text>
          <Text style={styles.actors}>{state.selected.Actors}</Text>
          <Text numberOfLines={5}>{state.selected.Plot}</Text>

          <Text style={styles.rating}>Rated: {state.selected.Rated}</Text>
          <TouchableHighlight
            onPress={() =>
              setState((prevState) => {
                return { ...prevState, selected: {} };
              })
            }
          >
            <Text style={styles.closeBtn}> Close</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#51557E",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  searchbox: {
    fontSize: 20,
    fontWeight: "300",
    padding: 20,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
    width: "100%",

    marginBottom: 20,
  },

  heading: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    padding: 20,

    backgroundColor: "#2C3639",
  },

  popup: {
    padding: 20,
  },
  poptitle: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 100,
    marginBottom: 10,
  },
  director: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 20,
  },
  actors: {
    fontWeight: "500",
    fontSize: 18,
    marginBottom: 30,
  },

  rating: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
  },

  closeBtn: {
    padding: 20,
    fontSize: 24,
    fontWeight: "700",
    backgroundColor: "#D9534F",
    color: "#fff",
    textAlign: "center",
    marginTop: 50,
  },
});
