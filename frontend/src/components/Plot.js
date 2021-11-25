import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
const API = process.env.REACT_APP_API;

export const Plot = () => {

    const id = sessionStorage.getItem("id");
    const [category, setCategory] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const course = [];
        const courseCount = [];
        
        const opts = {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            codigo: id,
          }),
        };
        
        fetch(`${API}/plot`,opts)
            .then(response => response.json())
            .then(query => {
                query.data.map(item => {
                  course.push(item.courseName)
                  courseCount.push(item.qty);
              })
              setCategory(course)
              setData(courseCount)
            });

    }, [])

    return (
        <Chart options={{
            chart: {
                id: 'apexchart-example'
            },
            xaxis: {
                categories: category
            }
        }}
            series={[{
                name: 'Cantidad',
                data: data
            }]} type="bar" />
    )
};

export default Plot
