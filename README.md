This marketplace install is used to make zip code maps using the Turtles beta feature. 



0) Talk to your Looker team to get enrolled in the Turtles beta

1) Follow these [directions](https://docs.looker.com/data-modeling/marketplace#installing_a_tool_from_a_git_url) to install via commit sha. 

```
Git URL: git@github.com:bryan-at-looker/turtle-map-vis.git
Git SHA: 90f91a3dff3de08fab08a01177d57e7d4986fbc0
```

2) Follow these [directions](https://docs.mapbox.com/help/how-mapbox-works/access-tokens) to get a free mapbox token.

3) In your zipcode dimension, make sure your dimension is type: zipcode and has a tag for your Mapbox Access Token.

```
dimension: your_zipcode {
  type: zipcode
  sql: ${TABLE}.zip ;;
  tags: ["pk.YourMapbox"]
}
```

4) Create a turtle, a named query with one dimension and one measure like so:

```
explore: order_items {
  query: zip_total_gross_margin {
    dimensions: [users.your_zipcode]
    measures: [order_items.total_gross_margin]
    sort: {field: order_items.total_gross_margin desc:yes}
  }
  query: zip_total_gross_margin_percentage {
    dimensions: [users.your_zipcode]
    measures: [order_items.total_gross_margin_percentage]
    sort: { field:order_items.total_gross_margin_percentage desc:yes}
  }

  join: users {
    relationship: many_to_one
    type: left_outer
    sql_on: ${order_items.user_id} = ${users.id} ;;
  }
}
```

5) Open up your explore, query just the turtles (no dimensions), and switch your visualizqation to the `Turtle Zip Map` found in the `...` selector in your visualization pain.