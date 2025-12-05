import { compareDesc } from "date-fns";

import { CollapsibleList } from "@/components/collapsible-list";

import { ACHIEVEMENTS } from "../../data/awards";
import { Panel, PanelHeader, PanelTitle, PanelTitleSup } from "../panel";
import { AwardItem } from "./award-item";

const SORTED_AWARDS = [...ACHIEVEMENTS].sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});

export function Awards() {
  return (
    <Panel id="awards">
      <PanelHeader>
        <PanelTitle>
          Achievements
          <PanelTitleSup>({ACHIEVEMENTS.length})</PanelTitleSup>
        </PanelTitle>
      </PanelHeader>

      <CollapsibleList
        items={SORTED_AWARDS}
        max={8}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <AwardItem award={item} />}
      />
    </Panel>
  );
}
