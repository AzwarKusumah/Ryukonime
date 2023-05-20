import { useEffect, useState, React } from "react";
import { useRouter } from "next/router";
import Navbar from "../../pages/components/navbar/navbar";
import Header from "../../pages/components/head";

export default function Episode() {
  return (
    <div>
      <Header />
      <Navbar />
    </div>
  );
}
