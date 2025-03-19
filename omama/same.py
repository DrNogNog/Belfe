import csv

# Read original CSV and split the column
input_file = "products.csv"
output_file = "products_split.csv"

with open(input_file, "r", encoding="utf-8") as infile, open(output_file, "w", newline="", encoding="utf-8") as outfile:
    reader = csv.reader(infile)
    writer = csv.writer(outfile)

    for row in reader:
        if " - " in row[2]:  # Assuming product name is in column index 2
            brand, product_name = row[2].split(" - ", 1)  # Split into two
            row[2] = brand
            row.insert(3, product_name)  # Insert the split part into a new column
        writer.writerow(row)

print(f"Saved cleaned file as {output_file}")
