import React from "react";
import styles from "./gantt.module.css";
import { TableMilestones } from "../../types/public-types";

export type Milestones = {
    milestones: TableMilestones[],
    height: number,
    width: number,
    columnWidth: number,
    onMilestoneClick: (item: TableMilestones) => void;
};

export const Milestones: React.FC<Milestones> = ({
    milestones,
    height,
    width,
    columnWidth,
    onMilestoneClick
}) => {
    return (
        <div className={styles.milestoneContainer}
            style={{
                height,
                width
            }}>
            <div style={{ width: columnWidth }} />
            {
                milestones.map(({ title, date }) => (
                    <div style={{ width: columnWidth }} key={title}>
                        <span className={styles.milestoneTitle} onClick={() => onMilestoneClick({ title, date })}>{title}</span>
                        <br /><span className={styles.milestoneDate}>({date})</span>
                    </div>
                ))
            }
        </div>
    );
};
