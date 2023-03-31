import geopandas as gpd

# Load shapefile into GeoDataFrame
gdf = gpd.read_file('path/to/shapefile.shp')

# Print the first five rows of the GeoDataFrame
print(gdf.head())

# Filter the GeoDataFrame based on a condition
filtered_gdf = gdf[gdf['population'] > 1000000]

# Export the filtered GeoDataFrame to a new shapefile
filtered_gdf.to_file('path/to/filtered_shapefile.shp')
