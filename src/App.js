import React, { useEffect, useState } from "react";

import "./App.css";
import fetchAxios from "./services/fetchAxios";

function App(props) {
  const [data, setData] = useState([]);
  const [dataOriginal, setDataOriginal] = useState([]);
  const [sortIndex, setSortIndex] = useState({
    country: 0,
    todayCases: 0,
    todayDeaths: 0,
    deaths: 0,
  });

  function getData() {
    fetchAxios.getData().then((res) => {
      if (res !== undefined) {
        let myArr = res.data.filter((item, index) => {
          return item.country && !item.country.includes("Total:");
        });
        setData(myArr);
        setDataOriginal(myArr);
      }
    });
  }

  function showData() {
    let xhtml = (
      <tr>
        <td colSpan="4">No data</td>
      </tr>
    );
    if (data.length > 0) {
      xhtml = data.map((item, index) => (
        <tr key={index}>
          <td>
            {index + 1}: {item.country}
          </td>
          <td>{item.todayCases}</td>
          <td>{item.todayDeaths}</td>
          <td>{item.deaths}</td>
        </tr>
      ));
    }
    return <tbody>{xhtml}</tbody>;
  }

  function handleSort(orderBy) {
    let currentIndex = sortIndex[orderBy];
    console.log("handleSort -> currentIndex", currentIndex);
    let updatedIndex = currentIndex + 1 <= 2 ? currentIndex + 1 : 0;
    console.log("handleSort -> updatedIndex", updatedIndex);
    setSortIndex({ ...sortIndex, [orderBy]: updatedIndex });

    let cloneData = [...data];

    if (updatedIndex === 1) {
      // cho = 1 la sort tang dan
      if (orderBy === "country") {
        //  a -> z
        cloneData.sort((itemBefore, itemAfter) => {
          return itemBefore.country.localeCompare(itemAfter.country);
        });
      } else {
        cloneData.sort((itemBefore, itemAfter) => {
          return itemBefore[orderBy] - itemAfter[orderBy];
        });
      }
      setData(cloneData);
    } else if (updatedIndex === 2) {
      // cho = 2 la sort giam dan
      if (orderBy === "country") {
        //  z -> a
        cloneData.sort((itemBefore, itemAfter) => {
          return itemAfter.country.localeCompare(itemBefore.country);
        });
      } else {
        cloneData.sort((itemBefore, itemAfter) => {
          return itemAfter[orderBy] - itemBefore[orderBy];
        });
      }
      setData(cloneData);
    } else {
      // = 0 la ko sort, cho tro ve arr ban dau
      setData(dataOriginal);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("country")}>Country</th>
            <th onClick={() => handleSort("todayCases")}>Today Cases</th>
            <th onClick={() => handleSort("todayDeaths")}>Today Deaths</th>
            <th onClick={() => handleSort("deaths")}>Deaths</th>
          </tr>
        </thead>
        {showData()}
      </table>
    </div>
  );
}

export default App;
