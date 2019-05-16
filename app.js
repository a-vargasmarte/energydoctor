// var w = 1500,
//   h = 800;

// var radius = 25;
// var color = d3.scaleOrdinal(d3.schemeCategory20);
// var centerScale = d3
//   .scalePoint()
//   .padding(1)
//   .range([0, w]);
// var forceStrength = 0.05;

// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("width", w)
//   .attr("height", h);

// var simulation = d3
//   .forceSimulation()
//   .force(
//     "collide",
//     d3
//       .forceCollide(function(d) {
//         return d.r + 8;
//       })
//       .iterations(16)
//   )
//   .force("charge", d3.forceManyBody())
//   .force("y", d3.forceY().y(h / 2))
//   .force("x", d3.forceX().x(w / 2));

// d3.json("beer.json", data => {
//   console.log(data);
//   let columnsObject = {
//     columns: []
//   };
//   let repos = data
//     .map((repo, i) => {
//       if (i < 30) {
//         console.log(repo["Brewery Name"]);
//         let repoObject = {
//           brewery: repo["Brewery Name"],
//           beerName: repo["Beer Name"],
//           style: repo["Beer Style"],
//           abv: repo["ABV"],
//           ibu: repo["IBU"]
//         };
//         for (key in repoObject) {
//           if (repoObject.hasOwnProperty(key) && i === 1) {
//             columnsObject.columns.push(key);
//           }
//         }

//         repoObject["r"] = radius;
//         repoObject["x"] = w / 2;
//         repoObject["y"] = h / 2;

//         return repoObject;
//       }
//       return null;
//     })
//     .slice(0, 30);

//   console.log(repos);
//   console.log(columnsObject.columns);

//   var circles = svg.selectAll("circle").data(repos, function(d) {
//     return d.beerName;
//   });

//   var circlesEnter = circles
//     .enter()
//     .append("circle")
//     .attr("r", function(d, i) {
//       return d.r;
//     })
//     .attr("cx", function(d, i) {
//       return 175 + 25 * i + 2 * i ** 2;
//     })
//     .attr("cy", function(d, i) {
//       return 250;
//     })
//     .style("fill", function(d, i) {
//       console.log(color(d.beerName));
//       return color(d.beerName);
//     })
//     .style("stroke", function(d, i) {
//       return color(d.beerName);
//     })
//     .style("stroke-width", 10)
//     .style("pointer-events", "all")
//     .call(
//       d3
//         .drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended)
//     );

//   circles = circles.merge(circlesEnter);

//   function ticked() {
//     //console.log("tick")
//     //console.log(data.map(function(d){ return d.x; }));
//     circles
//       .attr("cx", function(d) {
//         return d.x;
//       })
//       .attr("cy", function(d) {
//         return d.y;
//       });
//   }

//   simulation.nodes(repos).on("tick", ticked);

//   function dragstarted(d, i) {
//     //console.log("dragstarted " + i)
//     if (!d3.event.active) simulation.alpha(1).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   }

//   function dragged(d, i) {
//     //console.log("dragged " + i)
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
//   }

//   function dragended(d, i) {
//     //console.log("dragended " + i)
//     if (!d3.event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//     var me = d3.select(this);
//     console.log(me.classed("selected"));
//     me.classed("selected", !me.classed("selected"));

//     d3.selectAll("circle").style("fill", function(d, i) {
//       return color(d.beerName);
//     });

//     d3.selectAll("circle.selected").style("fill", "none");
//   }

//   function groupBubbles() {
//     hideTitles();

//     // @v4 Reset the 'x' force to draw the bubbles to the center.
//     simulation.force(
//       "x",
//       d3
//         .forceX()
//         .strength(forceStrength)
//         .x(w / 2)
//     );

//     // @v4 We can reset the alpha value and restart the simulation
//     simulation.alpha(1).restart();
//   }

//   function splitBubbles(byVar) {
//     centerScale.domain(
//       data.map(function(d, i) {
//         if (i < 30) {
//           return d[byVar];
//         }
//       })
//     );

//     if (byVar == "all") {
//       hideTitles();
//     } else {
//       showTitles(byVar, centerScale);
//     }

//     // @v4 Reset the 'x' force to draw the bubbles to their year centers
//     simulation.force(
//       "x",
//       d3
//         .forceX()
//         .strength(forceStrength)
//         .x(function(d, i) {
//           if (i < 30) {
//             return centerScale(d[byVar]);
//           }
//         })
//     );

//     // @v4 We can reset the alpha value and restart the simulation
//     simulation.alpha(2).restart();
//   }

//   function hideTitles() {
//     svg.selectAll(".title").remove();
//   }

//   function showTitles(byVar, scale) {
//     // Another way to do this would be to create
//     // the year texts once and then just hide them.
//     var titles = svg.selectAll(".title").data(scale.domain());

//     titles
//       .enter()
//       .append("text")
//       .attr("class", "title")
//       .merge(titles)
//       .attr("x", function(d) {
//         return scale(d);
//       })
//       .attr("y", 40)
//       .attr("text-anchor", "middle")
//       .text(function(d) {
//         return d;
//       });

//     titles.exit().remove();
//   }

//   function setupButtons() {
//     d3.selectAll(".button").on("click", function() {
//       // Remove active class from all buttons
//       d3.selectAll(".button").classed("active", false);
//       // Find the button just clicked
//       var button = d3.select(this);

//       // Set it as the active button
//       button.classed("active", true);

//       // Get the id of the button
//       var buttonId = button.attr("id");

//       console.log(buttonId);
//       // Toggle the bubble chart based on
//       // the currently clicked button.
//       splitBubbles(buttonId);
//     });
//   }

//   setupButtons();
// });

// d3.csv("beerSample.csv", function(data) {
//   console.log(data);
//   let randomData = [];

//   let i = 0;

//   while (i < 8) {
//     // console.log(i)
//     let randomItem = data[Math.floor(Math.random() * data.length)];
//     randomData.push(randomItem);
//     i++;
//   }
//   console.log(randomData);

//   randomData.forEach(function(d) {
//     d.r = d.purchase / 10 + 5;
//     d.x = w / 2;
//     d.y = h / 2;
//   });

//   // console.log(data);

//   var circles = svg.selectAll("circle").data(randomData, function(d, i) {
//     return i;
//   });

//   var circlesEnter = circles
//     .enter()
//     .append("circle")
//     .attr("r", function(d, i) {
//       return d.r;
//     })
//     .attr("cx", function(d, i) {
//       return 175 + 25 * i + 2 * i ** 2;
//     })
//     .attr("cy", function(d, i) {
//       return 250;
//     })
//     .style("fill", function(d, i) {
//       return color(i);
//     })
//     .attr("opacity", function(d, i) {
//       // console.log(d);
//       return Number(d.ABV) / 5;
//     })
//     .style("stroke", function(d, i) {
//       return color(i);
//     })
//     .style("stroke-width", 10)
//     .style("pointer-events", "all")
//     .call(
//       d3
//         .drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended)
//     );

//   circles = circles.merge(circlesEnter);

//   function ticked() {
//     //console.log("tick")
//     //console.log(data.map(function(d){ return d.x; }));
//     circles
//       .attr("cx", function(d) {
//         return d.x;
//       })
//       .attr("cy", function(d) {
//         return d.y;
//       });
//   }

//   simulation.nodes(randomData).on("tick", ticked);

//   function dragstarted(d, i) {
//     //console.log("dragstarted " + i)
//     if (!d3.event.active) simulation.alpha(1).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   }

//   function dragged(d, i) {
//     //console.log("dragged " + i)
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
//   }

//   function dragended(d, i) {
//     //console.log("dragended " + i)
//     if (!d3.event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//     var me = d3.select(this);
//     // console.log(me.classed("selected"));
//     me.classed("selected", !me.classed("selected"));

//     d3.selectAll("circle").style("fill", function(d, i) {
//       return color(i);
//     });

//     d3.selectAll("circle.selected").style("fill", "none");
//   }

//   function groupBubbles() {
//     hideTitles();

//     // @v4 Reset the 'x' force to draw the bubbles to the center.
//     simulation.force(
//       "x",
//       d3
//         .forceX()
//         .strength(forceStrength)
//         .x(w / 2)
//     );

//     // @v4 We can reset the alpha value and restart the simulation
//     simulation.alpha(1).restart();
//   }

//   function splitBubbles(byVar) {
//     centerScale.domain(
//       randomData.map(function(d) {
//         return d[byVar];
//       })
//     );

//     if (byVar == "all") {
//       hideTitles();
//     } else {
//       showTitles(byVar, centerScale);
//     }

//     // @v4 Reset the 'x' force to draw the bubbles to their year centers
//     simulation.force(
//       "x",
//       d3
//         .forceX()
//         .strength(forceStrength)
//         .x(function(d) {
//           return centerScale(d[byVar]);
//         })
//     );

//     // @v4 We can reset the alpha value and restart the simulation
//     simulation.alpha(2).restart();
//   }

//   function hideTitles() {
//     svg.selectAll(".title").remove();
//   }

//   function showTitles(byVar, scale) {
//     // Another way to do this would be to create
//     // the year texts once and then just hide them.
//     var titles = svg.selectAll(".title").data(scale.domain());

//     titles
//       .enter()
//       .append("text")
//       .attr("class", "title")
//       .merge(titles)
//       .attr("x", function(d) {
//         return scale(d);
//       })
//       .attr("y", 40)
//       .attr("text-anchor", "middle")
//       .text(function(d) {
//         return d;
//       });

//     titles.exit().remove();
//   }

//   function setupButtons() {
//     d3.selectAll(".button").on("click", function() {
//       // Remove active class from all buttons
//       d3.selectAll(".button").classed("active", false);
//       // Find the button just clicked
//       var button = d3.select(this);

//       // Set it as the active button
//       button.classed("active", true);

//       // Get the id of the button
//       var buttonId = button.attr("id");

//       // console.log(buttonId);
//       // Toggle the bubble chart based on
//       // the currently clicked button.
//       splitBubbles(buttonId);
//     });
//   }

//   setupButtons();
// });

// axios.get('')

/////////////////////////Concept Map/////////////////////

var flaredata = {
  ditems: [
    {
      type: "ditem",
      name: "webmetro.com",
      ditem: 0,
      links: [
        "1to1media.com",
        "adotas.com",
        "air-nifty.com",
        "alistsites.com",
        "andrewhansen.name",
        "b2bmarketing.net",
        "bestseocompanies.com",
        "bloomecorp.com",
        "botw.org",
        "btobonlinedirectory.com",
        "budgetinnpocahontas.com",
        "businessnewsdaily.com",
        "calif.com",
        "cmpcmm.com",
        "comparisonengines.com",
        "copperpeddler.com",
        "creatingapassiveincome.com",
        "dmnews.com",
        "domainvader.com",
        "f-c-j-aaagym.info",
        "feedburner.com",
        "fnibolivia.org",
        "inc.com",
        "jordansalvit.com",
        "julianyland.com",
        "kaitsbandphotography.com",
        "kidsaintcheap.com",
        "labtrans.ufsc.br",
        "lalady.com",
        "laokay.com",
        "list-of-domains.org",
        "listofdomains.org",
        "magnetglobal.org",
        "marketingsherpa.com",
        "markmelenhorst.nl",
        "mattcutts.com",
        "miyukisan.jp",
        "onwardsearch.com",
        "prweb.com",
        "revana.com",
        "rimmkaufman.com",
        "scmsdc.org",
        "searchengineguide.com",
        "searchenginejournal.com",
        "searchmarketingexpo.com",
        "searchmarketingstandard.com",
        "sempo.org",
        "seocompanyreviews.com",
        "seohunts.com",
        "seroundtable.com",
        "smart-travel-incentives.com",
        "theglobe.net",
        "thinkwithgoogle.com",
        "topseos.co.in",
        "topseos.com",
        "webbydre.com",
        "weblogs.us",
        "westlicht.ch",
        "your-daily-income.com"
      ]
    },
    { type: "ditem", name: "webmetro.com/about.htm", ditem: 1, links: [] },
    {
      type: "ditem",
      name: "webmetro.com/Blog",
      ditem: 2,
      links: ["adotas.com", "prweb.com", "startupgenome.co"]
    },
    {
      type: "ditem",
      name: "webmetro.com/contact/events.html",
      ditem: 3,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/contact/request-consultation",
      ditem: 4,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/content-advertising",
      ditem: 5,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/internet-marketing",
      ditem: 6,
      links: [
        "iglesiacristianaicem.org.mx",
        "kaitsbandphotography.com",
        "moneyaftergraduation.com",
        "thecollegeinvestor.com"
      ]
    },
    {
      type: "ditem",
      name: "webmetro.com/internet-marketing/online-media",
      ditem: 7,
      links: []
    },
    {
      type: "ditem",
      name:
        "webmetro.com/internet-marketing/online-media/affiliate-marketing.html",
      ditem: 8,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/internet-marketing/online-media/display-advertising",
      ditem: 9,
      links: []
    },
    {
      type: "ditem",
      name:
        "webmetro.com/internet-marketing/online-media/display-advertising.html",
      ditem: 10,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/internet-marketing/online-media/video-marketing.html",
      ditem: 11,
      links: ["prweb.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/internet-marketing/search-marketing",
      ditem: 12,
      links: []
    },
    {
      type: "ditem",
      name:
        "webmetro.com/internet-marketing/search-marketing/pay-per-click-ppc",
      ditem: 13,
      links: ["beatthe9to5.com"]
    },
    {
      type: "ditem",
      name:
        "webmetro.com/internet-marketing/search-marketing/pay-per-click-ppc.html",
      ditem: 14,
      links: ["blog-lineaguida.com", "jamesgoughmd.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/internet-marketing/search-marketing/seo",
      ditem: 15,
      links: ["beatthe9to5.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/internet-marketing/search-marketing/seo.html",
      ditem: 16,
      links: ["kidsaintcheap.com", "thecollegeinvestor.com", "topseos.com"]
    },
    {
      type: "ditem",
      name:
        "webmetro.com/internet-marketing/user-engagement/website-design.html",
      ditem: 17,
      links: ["prweb.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/Keyword_Rank.asp",
      ditem: 18,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/news1detail1.asp?id=1208",
      ditem: 19,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/our-work/case-studies",
      ditem: 20,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/our-work/insights",
      ditem: 21,
      links: [
        "adotas.com",
        "howstuffworks.com",
        "prweb.com",
        "startupgenome.co"
      ]
    },
    {
      type: "ditem",
      name: "webmetro.com/our-work/insights/povs/2008/01/16/ppc-strategy",
      ditem: 22,
      links: []
    },
    {
      type: "ditem",
      name:
        "webmetro.com/our-work/insights/tips-and-advice/2008/05/12/is-your-website-seo-ready",
      ditem: 23,
      links: []
    },
    {
      type: "ditem",
      name:
        "webmetro.com/our-work/insights/tips-and-advice/2008/10/10/top-10-tips-for-b2b-search-engine-marketing",
      ditem: 24,
      links: ["searchengineland.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/pay-per-click-ppc",
      ditem: 25,
      links: ["blog-lineaguida.com", "jamesgoughmd.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/privacypolicy.htm",
      ditem: 26,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/privacypolicy.html",
      ditem: 27,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/promotion.htm",
      ditem: 28,
      links: ["prweb.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/resources/tools/Link-popularity.aspx",
      ditem: 29,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/resources/tools/meta-tags.aspx",
      ditem: 30,
      links: []
    },
    {
      type: "ditem",
      name: "webmetro.com/resources/tools/search-saturation.aspx",
      ditem: 31,
      links: []
    },
    { type: "ditem", name: "webmetro.com/seo.htm", ditem: 32, links: [] },
    {
      type: "ditem",
      name: "webmetro.com/vmarketing.htm",
      ditem: 33,
      links: ["prweb.com"]
    },
    { type: "ditem", name: "webmetro.com/who-we-are", ditem: 34, links: [] },
    {
      type: "ditem",
      name: "webmetro.com/who-we-are/careers",
      ditem: 35,
      links: ["teletechjobs.com"]
    },
    {
      type: "ditem",
      name: "webmetro.com/who-we-are/leadership.html",
      ditem: 36,
      links: []
    },
    {
      type: "ditem",
      name:
        "webmetro.com/who-we-are/press-releases/detail/!press-releases/2013/05/13/webmetro-named-by-ad-age-as-one-of-the-25-largest-u.s.-search-marketing-agencies",
      ditem: 37,
      links: ["prnewswire.com"]
    },
    {
      type: "ditem",
      name:
        "webmetro.com/who-we-are/press-releases/detail/!press-releases/2013/07/30/webmetro-announces-agreement-to-be-acquired-by-teletech",
      ditem: 38,
      links: ["searchengineland.com"]
    },
    {
      type: "ditem",
      name:
        "webmetro.com/who-we-are/press-releases/detail/2006/09/27/feedadvantage-a-big-advantage-for-shopping-portal-advertisers",
      ditem: 39,
      links: []
    }
  ],
  themes: [
    {
      type: "theme",
      name: "1to1media.com",
      description: "",
      slug: "1to1media.com-2"
    },
    {
      type: "theme",
      name: "adotas.com",
      description: "",
      slug: "adotas.com-2"
    },
    {
      type: "theme",
      name: "air-nifty.com",
      description: "",
      slug: "air-nifty.com-2"
    },
    {
      type: "theme",
      name: "alistsites.com",
      description: "",
      slug: "alistsites.com-2"
    },
    {
      type: "theme",
      name: "andrewhansen.name",
      description: "",
      slug: "andrewhansen.name-2"
    },
    {
      type: "theme",
      name: "b2bmarketing.net",
      description: "",
      slug: "b2bmarketing.net-2"
    },
    {
      type: "theme",
      name: "beatthe9to5.com",
      description: "",
      slug: "beatthe9to5.com-2"
    },
    {
      type: "theme",
      name: "bestseocompanies.com",
      description: "",
      slug: "bestseocompanies.com-2"
    },
    {
      type: "theme",
      name: "blog-lineaguida.com",
      description: "",
      slug: "blog-lineaguida.com-2"
    },
    {
      type: "theme",
      name: "bloomecorp.com",
      description: "",
      slug: "bloomecorp.com-2"
    },
    { type: "theme", name: "botw.org", description: "", slug: "botw.org-2" },
    {
      type: "theme",
      name: "btobonlinedirectory.com",
      description: "",
      slug: "btobonlinedirectory.com-2"
    },
    {
      type: "theme",
      name: "budgetinnpocahontas.com",
      description: "",
      slug: "budgetinnpocahontas.com-2"
    },
    {
      type: "theme",
      name: "businessnewsdaily.com",
      description: "",
      slug: "businessnewsdaily.com-2"
    },
    { type: "theme", name: "calif.com", description: "", slug: "calif.com-2" },
    {
      type: "theme",
      name: "catalystsearchmarketing.com",
      description: "",
      slug: "catalystsearchmarketing.com-2"
    },
    {
      type: "theme",
      name: "cmpcmm.com",
      description: "",
      slug: "cmpcmm.com-2"
    },
    {
      type: "theme",
      name: "comparisonengines.com",
      description: "",
      slug: "comparisonengines.com-2"
    },
    {
      type: "theme",
      name: "copperpeddler.com",
      description: "",
      slug: "copperpeddler.com-2"
    },
    {
      type: "theme",
      name: "creatingapassiveincome.com",
      description: "",
      slug: "creatingapassiveincome.com-2"
    },
    {
      type: "theme",
      name: "dmnews.com",
      description: "",
      slug: "dmnews.com-2"
    },
    {
      type: "theme",
      name: "domainvader.com",
      description: "",
      slug: "domainvader.com-2"
    },
    {
      type: "theme",
      name: "f-c-j-aaagym.info",
      description: "",
      slug: "f-c-j-aaagym.info-2"
    },
    {
      type: "theme",
      name: "feedburner.com",
      description: "",
      slug: "feedburner.com-2"
    },
    {
      type: "theme",
      name: "fnibolivia.org",
      description: "",
      slug: "fnibolivia.org-2"
    },
    {
      type: "theme",
      name: "howstuffworks.com",
      description: "",
      slug: "howstuffworks.com-2"
    },
    {
      type: "theme",
      name: "iglesiacristianaicem.org.mx",
      description: "",
      slug: "iglesiacristianaicem.org.mx-2"
    },
    { type: "theme", name: "inc.com", description: "", slug: "inc.com-2" },
    {
      type: "theme",
      name: "internetkapitaene.de",
      description: "",
      slug: "internetkapitaene.de-2"
    },
    {
      type: "theme",
      name: "jamesgoughmd.com",
      description: "",
      slug: "jamesgoughmd.com-2"
    },
    {
      type: "theme",
      name: "jordansalvit.com",
      description: "",
      slug: "jordansalvit.com-2"
    },
    {
      type: "theme",
      name: "julianyland.com",
      description: "",
      slug: "julianyland.com-2"
    },
    {
      type: "theme",
      name: "kaitsbandphotography.com",
      description: "",
      slug: "kaitsbandphotography.com-2"
    },
    {
      type: "theme",
      name: "kidsaintcheap.com",
      description: "",
      slug: "kidsaintcheap.com-2"
    },
    {
      type: "theme",
      name: "labtrans.ufsc.br",
      description: "",
      slug: "labtrans.ufsc.br-2"
    },
    {
      type: "theme",
      name: "lalady.com",
      description: "",
      slug: "lalady.com-2"
    },
    {
      type: "theme",
      name: "laokay.com",
      description: "",
      slug: "laokay.com-2"
    },
    {
      type: "theme",
      name: "list-of-domains.org",
      description: "",
      slug: "list-of-domains.org-2"
    },
    {
      type: "theme",
      name: "listofdomains.org",
      description: "",
      slug: "listofdomains.org-2"
    },
    {
      type: "theme",
      name: "magnetglobal.org",
      description: "",
      slug: "magnetglobal.org-2"
    },
    {
      type: "theme",
      name: "marketingsherpa.com",
      description: "",
      slug: "marketingsherpa.com-2"
    },
    {
      type: "theme",
      name: "markmelenhorst.nl",
      description: "",
      slug: "markmelenhorst.nl-2"
    },
    {
      type: "theme",
      name: "mattcutts.com",
      description: "",
      slug: "mattcutts.com-2"
    },
    {
      type: "theme",
      name: "miyukisan.jp",
      description: "",
      slug: "miyukisan.jp-2"
    },
    {
      type: "theme",
      name: "moneyaftergraduation.com",
      description: "",
      slug: "moneyaftergraduation.com-2"
    },
    {
      type: "theme",
      name: "onwardsearch.com",
      description: "",
      slug: "onwardsearch.com-2"
    },
    {
      type: "theme",
      name: "prnewswire.com",
      description: "",
      slug: "prnewswire.com-2"
    },
    { type: "theme", name: "prweb.com", description: "", slug: "prweb.com-2" },
    {
      type: "theme",
      name: "revana.com",
      description: "",
      slug: "revana.com-2"
    },
    {
      type: "theme",
      name: "rimmkaufman.com",
      description: "",
      slug: "rimmkaufman.com-2"
    },
    {
      type: "theme",
      name: "scmsdc.org",
      description: "",
      slug: "scmsdc.org-2"
    },
    {
      type: "theme",
      name: "searchengineguide.com",
      description: "",
      slug: "searchengineguide.com-2"
    },
    {
      type: "theme",
      name: "searchenginejournal.com",
      description: "",
      slug: "searchenginejournal.com-2"
    },
    {
      type: "theme",
      name: "searchengineland.com",
      description: "",
      slug: "searchengineland.com-2"
    },
    {
      type: "theme",
      name: "searchmarketingexpo.com",
      description: "",
      slug: "searchmarketingexpo.com-2"
    },
    {
      type: "theme",
      name: "searchmarketingstandard.com",
      description: "",
      slug: "searchmarketingstandard.com-2"
    },
    { type: "theme", name: "sempo.org", description: "", slug: "sempo.org-2" },
    {
      type: "theme",
      name: "seocompanyreviews.com",
      description: "",
      slug: "seocompanyreviews.com-2"
    },
    {
      type: "theme",
      name: "seohunts.com",
      description: "",
      slug: "seohunts.com-2"
    },
    {
      type: "theme",
      name: "seroundtable.com",
      description: "",
      slug: "seroundtable.com-2"
    },
    {
      type: "theme",
      name: "smart-travel-incentives.com",
      description: "",
      slug: "smart-travel-incentives.com-2"
    },
    {
      type: "theme",
      name: "startupgenome.co",
      description: "",
      slug: "startupgenome.co-2"
    },
    {
      type: "theme",
      name: "teletechjobs.com",
      description: "",
      slug: "teletechjobs.com-2"
    },
    {
      type: "theme",
      name: "thecollegeinvestor.com",
      description: "",
      slug: "thecollegeinvestor.com-2"
    },
    {
      type: "theme",
      name: "theglobe.net",
      description: "",
      slug: "theglobe.net-2"
    },
    {
      type: "theme",
      name: "thinkwithgoogle.com",
      description: "",
      slug: "thinkwithgoogle.com-2"
    },
    {
      type: "theme",
      name: "topseos.co.in",
      description: "",
      slug: "topseos.co.in-2"
    },
    {
      type: "theme",
      name: "topseos.com",
      description: "",
      slug: "topseos.com-2"
    },
    {
      type: "theme",
      name: "webbydre.com",
      description: "",
      slug: "webbydre.com-2"
    },
    {
      type: "theme",
      name: "weblogs.us",
      description: "",
      slug: "weblogs.us-2"
    },
    {
      type: "theme",
      name: "westlicht.ch",
      description: "",
      slug: "westlicht.ch-2"
    },
    {
      type: "theme",
      name: "your-daily-income.com",
      description: "",
      slug: "your-daily-income.com-2"
    }
  ]
};

// let beerData;
d3.csv("./beerSample.csv", data => {
  //   beerData = data;

  $(function() {
    plotConceptMap();
  });
  function plotConceptMap() {
    var plot = ConceptMap("graph", "graph-info", data);
  }
});
//ConceptMap.js
function ConceptMap(chartElementId, infoElementId, dataJson) {
  console.log(dataJson);
  var width = document.body.clientWidth; //window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var height = 700; // window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var a = width,
    c = height,
    h = c,
    U = 200,
    K = 22,
    S = 20,
    s = 8,
    R = -30, // Radius for node circle 110
    J = 30,
    o = 15,
    t = 10,
    w = 1000,
    F = "elastic",
    N = "#0da4d3";
  var T, q, x, j, H, A, P;
  var L = {},
    k = {};
  var i, y;
  var r = d3.layout
    .tree()
    .size([360, h / 2 - R])
    .separation(function(Y, X) {
      console.log(Y.parent);
      return (Y.parent == X.parent ? 1 : 2) / Y.depth;
    });
  console.log(r);
  var W = d3.svg.diagonal.radial().projection(function(X) {
    console.log(X);
    return [X.y, (X.x / 180) * Math.PI];
  });
  var v = d3.svg
    .line()
    .x(function(X) {
      return X[0];
    })
    .y(function(X) {
      return X[1];
    })
    .interpolate("bundle")
    .tension(0.5);
  //Node name at Footer
  var Nh = c / 2 + 100;
  var svgHeight = c + 250;
  var d = d3
    .select("#" + chartElementId)
    .append("svg")
    .attr("width", a)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + a / 2 + "," + Nh + ")");
  console.log(d);
  var I = d
    .append("rect")
    .attr("class", "bg")
    .attr({
      x: a / -2,
      y: c / -2,
      width: a,
      height: c,
      fill: "transparent"
    })
    .on("click", O);
  var B = d.append("g").attr("class", "links"),
    f = d.append("g").attr("class", "ditems"),
    E = d.append("g").attr("class", "nodes");

  var Q = d3.select("#" + infoElementId);

  T = d3.map(dataJson);
  //   console.log(T);
  console.log(T.values());
  q = d3.merge(T.values());

  x = {};
  A = d3.map();

  /**********************/
  var outerId = [0];
  /**********************/

  q.forEach(function(aa) {
    aa.key = p(aa.name);
    aa.canonicalKey = aa.key;
    x[aa.key] = aa;

    if (aa.group) {
      if (!A.has(aa.group)) {
        A.set(aa.group, []);
      }
      A.get(aa.group).push(aa);
    }
  });

  /***********Used for Node color on mouse over=Start**********/
  j = d3.map();

  T.get("ditems").forEach(function(aa) {
    aa.links = aa.links.filter(function(ab) {
      return typeof x[p(ab)] !== "undefined"; //&& ab.indexOf("r-") !== 0
    });

    j.set(
      aa.key,
      aa.links.map(function(ab) {
        var ac = p(ab);
        if (typeof j.get(ac) === "undefined") {
          j.set(ac, []);
        }
        j.get(ac).push(aa);
        return x[ac];
      })
    );
  });
  /*********Used for Node color on mouse over- End***********/
  var Z = window.location.hash.substring(1);
  if (Z && x[Z]) {
    G(x[Z]);
  } else {
    O();
    M();
  }

  window.onhashchange = function() {
    var aa = window.location.hash.substring(1);
    if (aa && x[aa]) {
      G(x[aa], true);
    }
  };

  function O() {
    if (L.node === null) {
      return;
    }
    L = {
      node: null,
      map: {}
    };
    i = Math.floor(c / T.get("ditems").length);
    y = Math.floor((T.get("ditems").length * i) / 2);
    T.get("ditems").forEach(function(af, ae) {
      af.x = U / -2;
      af.y = ae * i - y;
    });
    //Half circular nodes var ad = 180 + J,
    // Full Circular nodes var ad = 0 + J,
    var ad = 0 + J,
      // Z = 360 - J,
      Z = 360 - J,
      ac = (Z - ad) / (T.get("themes").length - 1);
    T.get("themes").forEach(function(af, ae) {
      /*Node with rectangle= start*/
      af.x = Z - ae * ac;
      af.y = h / 2 - R;
      //            af.xOffset = -S;
      af.xOffset = -S;
      af.depth = 1;
      /*Node with rectange= End*/
    });
    //  ad = J;
    //  Z = 180 - J;
    //        ac = (Z - ad) / (T.get("perspectives").length - 1);
    //        T.get("perspectives").forEach(function (af, ae) {
    //            af.x = ae * ac + ad;
    //            af.y = h / 2 - R;
    //            af.xOffset = S;
    //            af.depth = 1
    //        });
    // New Code

    H = [];
    var ab,
      Y,
      aa,
      X = h / 2 - R;
    T.get("ditems").forEach(function(ae) {
      ae.links.forEach(function(af) {
        ab = x[p(af)];
        if (!ab || ab.type === "reference") {
          return;
        }
        Y = ((ab.x - 90) * Math.PI) / 180;
        aa = ae.key + "-to-" + ab.key;
        H.push({
          source: ae,
          target: ab,
          key: aa,
          canonicalKey: aa,
          x1: ae.x + (ab.type === "theme" ? 0 : U),
          y1: ae.y + K / 2,
          x2: Math.cos(Y) * X + ab.xOffset,
          y2: Math.sin(Y) * X
        });
      });
    });
    P = [];
    A.forEach(function(af, ag) {
      var ae = ((ag[0].x - 90) * Math.PI) / 180;
      //a2 = (ag[1].x - 90) * Math.PI / 180, bulge = 20;
      P.push({
        x1: Math.cos(ae) * X + ag[0].xOffset,

        y1: Math.sin(ae) * X //,
        //xx: Math.cos((ae + a2) / 2) * (X + bulge) + ag[0].xOffset,
        // yy: Math.sin((ae + a2) / 2) * (X + bulge),
        // x2: Math.cos(a2) * X + ag[1].xOffset,
        //  y2: Math.sin(a2) * X
      });
    });
    window.location.hash = "";
    M();
  }

  function G(Y, X) {
    if (L.node === Y && X !== true) {
      if (Y.type === "ditem") {
        window.location.href = "/" + Y.slug;
        return;
      }
      L.node.children.forEach(function(aa) {
        aa.children = aa._group;
      });
      e();
      return;
    }
    if (Y.isGroup) {
      L.node.children.forEach(function(aa) {
        aa.children = aa._group;
      });
      Y.parent.children = Y.parent._children;
      e();
      return;
    }
    Y = x[Y.canonicalKey];
    q.forEach(function(aa) {
      aa.parent = null;
      aa.children = [];
      aa._children = [];
      aa._group = [];
      aa.canonicalKey = aa.key;
      aa.xOffset = 0;
    });
    L.node = Y;
    L.node.children = j.get(Y.canonicalKey);
    L.map = {};
    var Z = 0;
    L.node.children.forEach(function(ac) {
      L.map[ac.key] = true;
      ac._children = j.get(ac.key).filter(function(ad) {
        return ad.canonicalKey !== Y.canonicalKey;
      });
      ac._children = JSON.parse(JSON.stringify(ac._children));
      ac._children.forEach(function(ad) {
        ad.canonicalKey = ad.key;
        ad.key = ac.key + "-" + ad.key;
        L.map[ad.key] = true;
      });
      var aa = ac.key + "-group",
        ab = ac._children.length;
      ac._group = [
        {
          isGroup: true,
          key: aa + "-group-key",
          canonicalKey: aa,
          name: ab,
          count: ab,
          xOffset: 0
        }
      ];
      L.map[aa] = true;
      Z += ab;
    });
    L.node.children.forEach(function(aa) {
      aa.children = Z > 50 ? aa._group : aa._children;
    });
    window.location.hash = L.node.key;
    e();
  }

  function n() {
    k = {
      node: null,
      map: {}
    };
    z();
  }

  function g(X) {
    if (k.node === X) {
      return;
    }
    k.node = X;
    k.map = {};
    k.map[X.key] = true;
    if (X.key !== X.canonicalKey) {
      k.map[X.parent.canonicalKey] = true;
      k.map[X.parent.canonicalKey + "-to-" + X.canonicalKey] = true;
      k.map[X.canonicalKey + "-to-" + X.parent.canonicalKey] = true;
    } else {
      j.get(X.canonicalKey).forEach(function(Y) {
        k.map[Y.canonicalKey] = true;
        k.map[X.canonicalKey + "-" + Y.canonicalKey] = true;
      });
      H.forEach(function(Y) {
        if (k.map[Y.source.canonicalKey] && k.map[Y.target.canonicalKey]) {
          k.map[Y.canonicalKey] = true;
        }
      });
    }
    z();
  }

  function M() {
    V();
    B.selectAll("path")
      .attr("d", function(X) {
        return v([[X.x1, X.y1], [X.x1, X.y1], [X.x1, X.y1]]);
      })
      .transition()
      .duration(w)
      .ease(F)
      .attr("d", function(X) {
        return v([[X.x1, X.y1], [X.target.xOffset * s, 0], [X.x2, X.y2]]);
      });
    D(T.get("ditems"));
    //        b(d3.merge([T.get("themes"), T.get("perspectives")]));
    b(T.get("themes"));
    C([]);
    m(P);
    Q.html('<a href="/the-concept-map/">What\'s this?</a>');
    n();
    z();
  }

  function e() {
    var X = r.nodes(L.node);
    X.forEach(function(Z) {
      if (Z.depth === 1) {
        Z.y -= 20;
      }
    });
    H = r.links(X);
    H.forEach(function(Z) {
      if (Z.source.type === "ditem") {
        Z.key = Z.source.canonicalKey + "-to-" + Z.target.canonicalKey;
      } else {
        Z.key = Z.target.canonicalKey + "-to-" + Z.source.canonicalKey;
      }
      Z.canonicalKey = Z.key;
    });
    V();
    B.selectAll("path")
      .transition()
      .duration(w)
      .ease(F)
      .attr("d", W);
    D([]);
    b(X);
    C([L.node]);
    m([]);
    var Y = "";
    if (L.node.description) {
      Y = L.node.description;
    }
    // Node Click Start
    if (L.node.name) {
      BindGridView(L.node.name);
    }
    // Node Click End
    Q.html(Y);
    n();
    z();
  }

  function b(X) {
    var X = E.selectAll(".node").data(X, u);
    var Y = X.enter()
      .append("g")
      .attr("transform", function(aa) {
        var Z = aa.parent
          ? aa.parent
          : {
              xOffset: 0,
              x: 0,
              y: 0
            };
        return (
          "translate(" +
          Z.xOffset +
          ",0)rotate(" +
          (Z.x - 90) +
          ")translate(" +
          Z.y +
          ")"
        );
      })
      .attr("class", "node")
      .on("mouseover", g)
      .on("mouseout", n)
      .on("click", G);
    Y.append("circle").attr("r", 0);
    Y.append("text")
      .attr("stroke", "#fff")
      .attr("stroke-width", 4)
      .attr("class", "label-stroke");
    Y.append("text")
      .attr("font-size", 0)
      .attr("class", "label");
    X.transition()
      .duration(w)
      .ease(F)
      .attr("transform", function(Z) {
        if (Z === L.node) {
          return null;
        }
        var aa = Z.isGroup ? Z.y + (7 + Z.count) : Z.y;
        return (
          "translate(" +
          Z.xOffset +
          ",0)rotate(" +
          (Z.x - 90) +
          ")translate(" +
          aa +
          ")"
        );
      });
    X.selectAll("circle")
      .transition()
      .duration(w)
      .ease(F)
      .attr("r", function(Z) {
        if (Z == L.node) {
          return 100;
        } else {
          if (Z.isGroup) {
            return 7 + Z.count;
          } else {
            return 4.5;
          }
        }
      });
    X.selectAll("text")
      .transition()
      .duration(w)
      .ease(F)
      .attr("dy", ".3em")
      .attr("font-size", function(Z) {
        if (Z.depth === 0) {
          return 20;
        } else {
          return 15;
        }
      })
      .text(function(Z) {
        return Z.name;
      })
      .attr("text-anchor", function(Z) {
        if (Z === L.node || Z.isGroup) {
          return "middle";
        }
        return Z.x < 180 ? "start" : "end";
      })
      .attr("transform", function(Z) {
        if (Z === L.node) {
          return null;
        } else {
          if (Z.isGroup) {
            return Z.x > 180 ? "rotate(180)" : null;
          }
        }
        return Z.x < 180
          ? "translate(" + t + ")"
          : "rotate(180)translate(-" + t + ")";
      });
    X.selectAll("text.label-stroke").attr("display", function(Z) {
      return Z.depth === 1 ? "block" : "none";
    });
    X.exit().remove();
  }

  function V() {
    var X = B.selectAll("path").data(H, u);
    X.enter()
      .append("path")
      .attr("d", function(Z) {
        var Y = Z.source
          ? {
              x: Z.source.x,
              y: Z.source.y
            }
          : {
              x: 0,
              y: 0
            };
        return W({
          source: Y,
          target: Y
        });
      })
      .attr("class", "link");
    X.exit().remove();
  }

  function C(Z) {
    var ac = d.selectAll(".detail").data(Z, u);
    var Y = ac
      .enter()
      .append("g")
      .attr("class", "detail");
    var ab = Z[0];
    if (ab && ab.type === "ditem") {
      var aa = Y.append("a").attr("xlink:href", function(ae) {
        return "/" + ae.slug;
      });
      aa.append("text")
        .attr("fill", N)
        .attr("text-anchor", "middle")
        .attr("y", (o + t) * -1)
        .text(function(ae) {
          return "ITEM " + ae.ditem;
        });
    } else {
      if (ab && ab.type === "theme") {
        Y.append("text")
          .attr("fill", "#aaa")
          .attr("text-anchor", "middle")
          .attr("y", (o + t) * -1)
          .text("THEME");
      } else {
        //                if (ab && ab.type === "perspective") {
        //                    var ad = ac.selectAll(".pair").data(A.get(ab.group).filter(function (ae) {
        //                        return ae !== ab
        //                    }), u);
        //                    ad.enter().append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", function (af, ae) {
        //                        return (o + t) * 2 + (ae * (o + t))
        //                    }).text(function (ae) {
        //                        return "(vs. " + ae.name + ")"
        //                    }).attr("class", "pair").on("click", G);
        //                    Y.append("text").attr("fill", "#aaa").attr("text-anchor", "middle").attr("y", (o + t) * -1).text("PERSPECTIVE");
        //                    ad.exit().remove()
        //                }
        // New code
      }
    }
    ac.exit().remove();
    var X = d.selectAll(".all-ditems").data(Z);
    X.enter()
      .append("text")
      .attr("text-anchor", "start")
      .attr("x", a / -2 + t)
      .attr("y", c / 2 - t)
      .text("all data")
      .attr("class", "all-ditems")
      .on("click", O);
    X.exit().remove();
  }

  function D(Y) {
    var Y = f.selectAll(".ditem").data(Y, u);
    var X = Y.enter()
      .append("g")
      .attr("class", "ditem")
      .on("mouseover", g)
      .on("mouseout", n)
      .on("click", G);
    X.append("rect")
      .attr("x", U / -2)
      .attr("y", K / -2)
      .attr("width", U)
      .attr("height", K)
      .transition()
      .duration(w)
      .ease(F)
      .attr("x", function(Z) {
        return Z.x;
      })
      .attr("y", function(Z) {
        return Z.y;
      });
    X.append("text")
      .attr("x", function(Z) {
        return U / -2 + t;
      })
      .attr("y", function(Z) {
        return K / -2 + o;
      })
      .attr("fill", "#fff")
      .text(function(Z) {
        // Remove / from Text
        var n = Z.name.lastIndexOf("/");
        var PageName = Z.name.substring(n + 1);
        return PageName;
        //return Z.name
      })
      .transition()
      .duration(w)
      .ease(F)
      .attr("x", function(Z) {
        return Z.x + t;
      })
      .attr("y", function(Z) {
        return Z.y + o;
      });
    Y.exit()
      .selectAll("rect")
      .transition()
      .duration(w)
      .ease(F)
      .attr("x", function(Z) {
        return U / -2;
      })
      .attr("y", function(Z) {
        return K / -2;
      });
    Y.exit()
      .selectAll("text")
      .transition()
      .duration(w)
      .ease(F)
      .attr("x", function(Z) {
        return U / -2 + t;
      })
      .attr("y", function(Z) {
        return K / -2 + o;
      });
    Y.exit()
      .transition()
      .duration(w)
      .remove();
  }

  function m(Y) {
    var X = f.selectAll("path").data(Y);
    X.enter()
      .append("path")
      .attr("d", function(Z) {
        return v([[Z.x1, Z.y1], [Z.x1, Z.y1], [Z.x1, Z.y1]]);
      })
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
      .transition()
      .duration(w)
      .ease(F)
      .attr("d", function(Z) {
        return v([[Z.x1, Z.y1], [Z.xx, Z.yy], [Z.x2, Z.y2]]);
      });
    X.exit().remove();
  }

  function z() {
    f.selectAll("rect").attr("fill", function(X) {
      return l(X, "#000", N, "#000");
    });
    B.selectAll("path")
      .attr("stroke", function(X) {
        return l(X, "#aaa", N, "#aaa");
      })
      .attr("stroke-width", function(X) {
        return l(X, "1.5px", "2.5px", "1px");
      })
      .attr("opacity", function(X) {
        return l(X, 0.4, 0.75, 0.3);
      })
      .sort(function(Y, X) {
        if (!k.node) {
          return 0;
        }
        var aa = k.map[Y.canonicalKey] ? 1 : 0,
          Z = k.map[X.canonicalKey] ? 1 : 0;
        return aa - Z;
      });
    E.selectAll("circle")
      .attr("fill", function(X) {
        if (X === L.node) {
          return "#000";
        } else {
          if (X.type === "theme") {
            return l(X, "#666", N, "#000");
          } //else {
          //                    if (X.type === "perspective") {
          //                        return "#fff"
          //                    }
          // }
          // New code
        }
        return l(X, "#000", N, "#999");
      })
      .attr("stroke", function(X) {
        if (X === L.node) {
          return l(X, null, N, null);
        } else {
          if (X.type === "theme") {
            return "#000";
          } else {
            //                    if (X.type === "perspective") {
            //                        return l(X, "#000", N, "#000")
            //                    }
          }
        }
        return null;
      })
      .attr("stroke-width", function(X) {
        if (X === L.node) {
          return l(X, null, 2.5, null);
        } else {
          //                if (X.type === "theme" || X.type === "perspective") {
          //                    return 1.5
          //                }
          if (X.type === "theme") {
            return 1.5;
          }
        }
        return null;
      });
    E.selectAll("text.label").attr("fill", function(X) {
      return X === L.node || X.isGroup ? "#fff" : l(X, "#000", N, "#999");
    });
  }

  function p(X) {
    return X.toLowerCase().replace(/[ .,()]/g, "-");
  }

  function u(X) {
    return X.key;
  }

  function l(X, aa, Z, Y) {
    if (k.node === null) {
      return aa;
    }
    return k.map[X.key] ? Z : aa;
  }
}

//Package.js

(function() {
  packages = {
    // Lazily construct the package hierarchy from class names.
    root: function(classes) {
      var map = {};

      function find(name, data) {
        var node = map[name],
          i;
        if (!node) {
          node = map[name] = data || { name: name, children: [] };
          if (name.length) {
            node.parent = find(name.substring(0, (i = name.lastIndexOf("."))));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach(function(d) {
        find(d.name, d);
      });

      return map[""];
    },

    // Return a list of imports for the given array of nodes.
    imports: function(nodes) {
      var map = {},
        imports = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.imports)
          d.imports.forEach(function(i) {
            imports.push({ source: map[d.name], target: map[i] });
          });
      });

      return imports;
    }
  };
})();
