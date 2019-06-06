// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const {
    ActivityHandler
} = require('botbuilder');

class MyBot extends ActivityHandler {


    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            var meetingExpression = new RegExp("^.*daily.*|^.*reuniao.*|^.*meeting.*|^.*\\?.*");
            var tyExpression = new RegExp("^.*thank you.*|^.*thx.*|^.*ty.*");
            var goodNightExpression = new RegExp("^.*good night.*|^.*see ya.*|^.*bye.*");
            var response = "";
            if (context.activity.text.match(meetingExpression) != null) {
                response = "(deadyes)";
                await context.sendActivity(response);
            }
            
            if (context.activity.text.match(tyExpression) != null) {
                response = "not a problem dude! (deadyes)";
                await context.sendActivity(response);
            }

            if (context.activity.text.match(goodNightExpression) != null) {
                response = "See ya soon partner (deadyes)";
                await context.sendActivity(response);
            }
            //await context.sendActivity(`You said '${ context.activity.text }'`);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity('EAE MAH');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MyBot = MyBot;