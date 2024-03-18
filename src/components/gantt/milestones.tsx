import React from "react";
import styles from "./gantt.module.css";
import { TableMilestones } from "../../types/public-types";
import milestoneStyles from "./milestones.module.css";

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
const backgroundBorderColor = {
    DONE: '#00C514',
    IMPACTED: '#FF0000',
    IN_PROGRESS: '#D9D9D9'
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
                    className={milestoneStyles.milestoneItem}
                        style={{
                            borderRight:`1.5px solid ${backgroundBorderColor[milestone.status || 'IN_PROGRESS']}` ,
                            width: '326px',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems:'end',
                            background: backgroundColor[milestone.status || 'IN_PROGRESS']
                        }}
                        key={milestone.title}>
                            <div style={{marginRight:'12px'}}>
                        <span className={styles.milestoneTitle} onClick={() => onMilestoneClick(milestone)}>{milestone.title}</span>
                        <br /><span style={{display:'inline-block', marginTop:'3px'}} className={styles.milestoneDate}>({milestone.endDate})</span>
                            </div>
            
                        { milestone.status !== 'IN_PROGRESS'  && (
                        <div style={{
                            borderTopColor:backgroundBorderColor[milestone.status || 'IN_PROGRESS'],
                        }} className={milestoneStyles.milestonePolygon}>
                        </div>)
                        }
                  
                    </div>
                ))
            }
        </div>
    );
};
