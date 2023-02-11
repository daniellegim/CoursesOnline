import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import UserCourseServer from "../../serverAPI/userCourses"
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CategoryChart = () => {
    const [categoryCount, setCategoryCount] = useState()

    useEffect(() => {
        const getData = async () => {
            const data = await UserCourseServer.getCategoryChartData()

            setCategoryCount(data)
        }

        getData()
    }, [])


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'מספר קורסים שנקנו מכל קטגוריה',
                font: {
                    size: 28
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 1,
                }
            }
        }
    };

    const labels = categoryCount?.map(c => c.category[0].name)

    const data = {
        labels,
        datasets: [
            {
                label: 'מספר קורסים שנקנו',
                data: categoryCount?.map(c => c.count),
                backgroundColor: '#dd33fa',
                maxBarThickness: 25,
            },
        ],
    }

    return (
        <div style={{ height: "25em", width: "45em", marginTop: "3em" }}>
            <Bar options={options} data={data} />
        </div>
    )
}

export default CategoryChart