import { useState, useEffect } from 'react'
import LeaderboardItem from '../leaderboardItem/LeaderboardItem'
import styles from './leader-table.module.scss'

const leaderboardInitialState = [
    {
        rank:1,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:2,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:3,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:4,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:5,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:6,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:7,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:8,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
    {
        rank:9,
        address:'0xc038...d4a82',
        totalScore:'480.05'
    },
]

export default function LeaderboardTable({list}) {    

  return (
    <div className={styles.table}>
        <div className={styles.head}>
        <span>Rank</span>
        <span>Address</span>
        <span>Total score</span>
        </div>
        <div className={styles.body}>
            {list.map((item,index) => {
                return <LeaderboardItem index={index} key={index} item={item}/>
            })}
        </div>
    </div>
  )
}
