import React from "react";
import styles from "./gantt.module.css";
import { TableMilestones } from "../../types/public-types";

export type Milestones = {
    milestones: TableMilestones[],
    height: number,
    width: number,
    onMilestoneClick: (item: TableMilestones) => void;
};

const backgroundColor = {
    DONE: '#CAF1CE',
    IMPACTED: '#FFD0D0',
    IN_PROGRESS: '#fefefe'
};

export const Milestones: React.FC<Milestones> = ({
    milestones,
    height,
    width,
    onMilestoneClick
}) => {

    return (
        <div className={styles.milestoneContainer}
            style={{
                height,
                width
            }}>
            {
                milestones.map((milestone) => (
                    <div
                        style={{
                            width: '240px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            background: backgroundColor[milestone.status || 'IN_PROGRESS']
                        }}
                        key={milestone.title}>
                        <span className={styles.milestoneTitle} onClick={() => onMilestoneClick(milestone)}>{milestone.title}</span>
                        <br /><span className={styles.milestoneDate}>({milestone.endDate})</span>
                    </div>
                ))
            }
        </div>
    );
};
