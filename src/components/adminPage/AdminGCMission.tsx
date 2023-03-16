import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdminGCMission = () => {
  return (
    <AccordionDetails>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h3>Mission</h3>
        </AccordionSummary>
        <AccordionDetails>
          <p>Mission thingies</p>
        </AccordionDetails>
      </Accordion>
    </AccordionDetails>
  );
};

export default AdminGCMission;
