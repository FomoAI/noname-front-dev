import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Image from 'next/image'
import arrowSvg from '../../../icons/arrow-rotate.svg'
import styles from './chart.module.scss'

const timeFilters = ["24H", "7D", "1M", "3M", "1Y"];

const data = [
  {
    name: '27.05',
    uv: 0,

  },
  {
    name: '28.05',
    uv: 100,

  },
  {
    name: '28.05',
    uv: 200,
  },
  {
    name: '28.05',
    uv: 700,
  },
  {
    name: '28.05',
    uv: 200,

  },
  {
    name: '28.05',
    uv: 150,
  },
  {
    name: '28.05',
    uv: 400,
  },
  {
    name: '28.05',
    uv: 400,
  },
  {
    name: '28.05',
    uv: 400,
  },
  {
    name: '28.05',
    uv: 200,
  },
];

const StakingChart = () => {
    const [selectedFilter, setSelectedFilter] = useState("7D");
    const [isTimeFilter, setIsTimeFilter] = useState(false);

    const changeFilter = (filter) => {
        setSelectedFilter(filter);
        setIsTimeFilter(false);
    };

    return (
        <div className={styles.body}>
            <div className={styles.head}>
                <div className={styles.info}>
                    <div className={styles.title}>
                        TVL reports
                    </div>
                    <div className={styles.value}>
                        $27M
                    </div>
                    <div className={styles.growth}>
                    +2.04% ($500K)
                    </div>
                </div>
                <div className={styles.timeFilter}>
                <div className={styles.timeFilterWrapper}>
                  <button
                    onClick={() => setIsTimeFilter((prev) => !prev)}
                    className={styles.timeFilterBtn}
                  >
                    {isTimeFilter ? (
                      <Image
                        className={styles.rotate}
                        src={arrowSvg}
                        alt="rotate arrow"
                      />
                    ) : (
                      <Image src={arrowSvg} alt="rotate arrow" />
                    )}
                    <span>{selectedFilter}</span>
                  </button>
                  <div
                    className={
                      isTimeFilter
                        ? styles.timeFilterList + " " + styles.visible
                        : styles.timeFilterList
                    }
                  >
                    {timeFilters.map((filter) => {
                      return (
                        <button
                          onClick={() => changeFilter(filter)}
                          key={filter}
                          className={styles.filterItemBtn}
                        >
                          {filter}
                        </button>
                      );
                    })}
                  </div>
                </div>
                </div>
            </div>
            <ResponsiveContainer className={'staking-chart'} width="106%" height="85%">
              <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis className='staking-chart-xasis' dataKey="name" />
                <YAxis className='staking-chart-yasis'/>
                <Area dataKey="uv" strokeWidth={'2'} stroke="#01C099" fill="#E9F8F5" />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      );
}

export default StakingChart
