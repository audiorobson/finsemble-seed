/*!
* Copyright 2017 by ChartIQ, Inc.
* All rights reserved.
*/
/**
 * This component is the name of a component and a pin that will pin that component to all toolbars.
 *
 */
import React from "react";

const SupportNotes = props => {
	return (
		<div className="dev-notes support">
			<div className="support-content">
				<span className="showcase-label">Support</span>
				<div className="support">
					{props.email}
				</div>
			</div>
			<div className="tags-content">
				<span className="showcase-label">Tags</span>
				<div className="tags">
					{props.tags.map((tag, i) => {
						let tagName = tag[0].toUpperCase() + tag.substring(1);

						return (
							<div key={"showcase-tag-label-" + i} className="tag-label" onClick={props.addTag.bind(this, tag)}>
								<span className="label-content">{tagName}</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default SupportNotes;