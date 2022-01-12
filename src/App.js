import React from "react";
import SetupForm from "./components/SetupForm";
import Modal from "./components/Modal";
import Loading from "./components/Loading";
import { useGlobalContext } from './context'

function App() {
  const { loading, waiting, questions, correct } = useGlobalContext();
  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }
  return (
    <main>
      Quiz app
    </main>
  );
}

export default App;
