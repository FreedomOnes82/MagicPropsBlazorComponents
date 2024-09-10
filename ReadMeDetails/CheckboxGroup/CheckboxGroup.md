[Home](https://github.com/FreedomOnes82/MagicPropsBlazorComponents/blob/main/README.md)     

**Checkbox Group**    
**Demo Images**:  
Here are a few demonstrative images that offer you a comprehensive overview of our checkbox group component.    
![Sample1](Sample1.png)    

![Sample2](Sample2.png)    

![Sample3](Sample3.png)


**Introduction**:  
This component mirrors the functionality of a Radio Group but tailored for checkboxes, offering versatility in its presentation. Users can opt for an inline display for a compact, space-saving view, or choose a vertical arrangement for enhanced clarity. Furthermore, the component allows for customization of the buttons within these checkboxes, providing three distinct styles to suit various aesthetic preferences.
* Standard Checkbox Button:A square box that allows users to either tick or untick, signifying their selection or deselection, respectively.
* Toggle Button: A custom, interactive button designed to toggle between a checked (selected) and unchecked (unselected) state, offering a visually appealing alternative to traditional radio buttons.
* Switch Button: A sliding switch design, commonly used for binary choices, providing a clear visual representation of the on/off or selected/unselected state.  

Here are the key properties related to the checkbox group component (Including MPCheckboxGroup and MPCheckboxOption), which provide customization options for both its display and functionality:  
**MPCheckboxGroup**:    
* **ChildContent**: Permits the seamless integration of HTML code or elements, which can be appended to the individual items within the group, typically achieved through the use of MPCheckboxOption or similar components. This feature enhances the flexibility and customizability of the checkbox group, allowing for the inclusion of additional information, styling, or interactive elements alongside each option.
* **Name**: Configuration option for specifying the unique name of the checkbox group. This setting is crucial for ensuring proper functionality and differentiation between multiple checkbox groups on the same page, allowing users to make independent selections within each group.
* **DisplayInline**: True or False, a setting to determine whether checkbox groups are displayed in an inline (horizontal) arrangement or a vertical stack. This option allows for customization of the layout, catering to different design preferences and ensuring that checkbox groups fit seamlessly within the overall user interface.
* **DisplayMode**: A configuration option for customizing the display style of buttons within the checkbox group. The available values include "DisplayModes.DefaultButton" for the standard checkbox button appearance, "DisplayModes.ToggleButton" for a custom-style button that indicates an selected or unselected state, and "DisplayModes.SwitchButton" for a sliding switch button that provides a more intuitive and interactive user experience. This setting enhances the visual appeal and usability of the checkbox group, allowing for a more tailored design that matches the overall look and feel of the application.
* **Value**: A configuration option that specifies the default selected values for the checkbox group. This setting ensures that when the group is first rendered, certain of the checkboxes is automatically selected, based on the predefined value. This feature is useful for pre-populating forms or indicating a recommended or default option to users.
* **Datasource**: A configuration option that allows for the binding of a data source to the checkbox group, where the data source is of the Dictionary<string, string> type. This feature enables dynamic population of the radio group options, with each key-value pair representing a unique radio button option. The keys serve as the values for the radio buttons, while the values can be used as display labels or additional metadata associated with each option. This approach simplifies the process of managing and updating checkbox group options, especially in scenarios where the options are sourced from a database or external data source.
* **ValueChanged**: A function that can be assigned to this property. When the selected value of the checkbox group changes, this function is automatically triggered, allowing for dynamic updates or validation checks.
      
**MPCheckboxOption**:    
* **Description**: Customizing the Label Name for the Checkbox Button Option
* **Value**: Specifying the Default Selected Option within Checkbox Button Groups.
* **Disabled**:  Enables or disables the checkbox option, allowing it to be checked or not, respectively, by setting to True or False.
* **ButtonClass**:  Custom Class Configuration for the Button when Display Mode is Set to "DisplayModes.ToggleButton"
        
Additionally, we can leverage Blazor EditForm for input validation, utilizing a property specifically designed for this purpose:  
* **ValidationFieldName**: This property designates the field within a class that is bound to the EditForm for validation purposes and it is required if you would like the validation working well.

In addition to the parameters mentioned, for this component, we require a List<string> named ValidationMessage. 
This list captures and stores error messages encountered during validation, enabling you to utilize them and display them on the page as necessary.
Here's how to use the ValidationMessage:
![Validation Message Sample](validationMessageSample.png)



   
