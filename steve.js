'use strict';
const axios = require('axios');
const twit  = require('twit');

const url = 'https://www.reddit.com/r/strangerthings/search.json?q=steve&sort=new&restrict_sr=1&t=day';

module.exports = function(ctx, cb) {

    let T = new twit({
        consumer_key:         ctx.data.consumer_key,
        consumer_secret:      ctx.data.consumer_secret,
        access_token:         ctx.data.access_token,
        access_token_secret:  ctx.data.access_token_secret,
        timeout_ms:           60*1000  // optional HTTP request timeout to apply to all requests.
    });

    let show_me_steve = permalink =>
        {
            let result = { success: true, status: "Successfully posted" + permalink };
            let post_text = "https://www.reddit.com/" + permalink;

            return T.post('statuses/update', { status: post_text }, function(err, data, response) {

                let result = { success: true, status: "Successfully posted" + permalink };
                if (err) {
                    result = { success: false, status: "Failed to post" + permalink };
                }

                return result;

            });
        };

    let succ = resp =>
        {
            Promise.all(resp.data.data.children.map((child) => show_me_steve(child.data.permalink))).then(posts_status => {

                let failed_posts = posts_status.filter((post) => post.success == false);
                let fail_message = failed_posts.reduce((m, f) => m + "\n" + f.status, "");

                let message = fail_message || "Successfully posted all Steves!";

                cb(null, { status: message });

            });
        };

    let err = resp =>
        {
            console.log(resp);
            cb(null, { status: "Reddit Failure"});
        };

    axios.get(url).then(succ).catch(err);
};
