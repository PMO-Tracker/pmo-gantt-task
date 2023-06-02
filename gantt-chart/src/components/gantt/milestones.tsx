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
                milestones.map((milestone) => (
                    <div style={{ width: columnWidth }} key={milestone.title}>
                        <span className={styles.milestoneTitle} onClick={() => onMilestoneClick(milestone)}>{milestone.title}</span>
                        <br /><span className={styles.milestoneDate}>({milestone.endDate})</span>
                    </div>
                ))
            }
        </div>
    );
};
