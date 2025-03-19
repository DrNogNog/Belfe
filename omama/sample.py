import os
import re

def create_folders_from_file(file_path, output_file_path):

    # Read the text file
    with open(file_path, 'r', encoding="utf-8") as file:
        product_details = file.readlines()
        a = str(product_details)
        b = a.split('-6.5.1-8.2z"></path></svg></button></div></a></div></div>')  # Modify as per actual split point

        # Open output file for writing
        with open(output_file_path, 'w', encoding="utf-8") as output_file:
            # Loop over each product HTML content segment
            # count = 0
            for html_content in b:
                # count += 1
                # if count == 2:
                #     print(html_content)
                # Define a regex pattern to extract href, img src, alt text, price, rating, number of reviews, and number of colors
                pattern = r'<a[^>]+href="([^"]+)"[^>]*>.*?<img[^>]+src="([^"]+)"[^>]+alt="([^"]+)".*?' \
                          r'<b[^>]*class="css-1f35s9q"[^>]*><span[^>]*class="css-0"[^>]*>([^<]+)<\/span><\/b>.*?' \
                          #r'style="width:\s*([\d.]+)%.*?' \
                          #r'[\d.]+\sreviews.*?' \
                          #r'[\d.]+\sColors.*?' 
                
                # Use re.findall() to find all matches
                matches = re.findall(pattern, html_content)
                #print(matches)
                # Create a bullet-point list of the key elements
                for match in matches:
                    url, img_src, alt_text,price = match
                    #rating,review_count,color_options = match
                    #url, img_src, alt_text, price, rating, review_count, color_options = match
                    #rating = rating if rating else "N/A"
                    #review_count = review_count if review_count else "N/A"
                    #color_options = color_options if color_options else "N/A"
                    # Write each extracted bullet point to the output file
                    output_file.write(f"• URL: {url}\n")
                    output_file.write(f"• Image Source: {img_src}\n")
                    output_file.write(f"• Alt Text: {alt_text}\n")
                    output_file.write(f"• Price: {price}\n")
                    #output_file.write(f"• Rating: {rating}\n")
                    #output_file.write(f"• Number of Reviews: {review_count}\n")
                    #output_file.write(f"• Available Colors: {color_options}\n\n")

            print(f"Extracted information has been saved to {output_file_path}")


if __name__ == "__main__":
    # Provide the path to your input and output files
    input_file_path = r"G:/omama/file.txt"  # Adjust the input file path accordingly
    output_file_path = r"G:/omama/extracted_product_details.txt"  # Adjust the output file path

    # Call the function to process and save to output file
    create_folders_from_file(input_file_path, output_file_path)
