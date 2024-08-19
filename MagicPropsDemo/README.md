**Blazor Components using Demos**

This Demo project shows up the demos how we use the blazor components we developed.
The componnets inlcude but not limit to Modal, Input, Checkbox, Radio buttons and more.

**How to use these Components**
1. First you need to download our componnet project  
![image](./Public_Images/Download_Components.png)   

2. Include thsi project in our own solution and build it   
![image](./Public_Images/Include_and_build_it_in_Project.png)   

3. Add this project into dependencies of your own project 
![image](./Public_Images/Add_The_Project_In_Your_Dependencies.png) 

4. Then you can use the related components  
![image](./Public_Images/Using_Componnent_Sample.png)  



**Demo Screenshots for Componnets**

We will introduce their functions and how to use them as below:  

1. Input  
The Input component serves as a versatile tool for capturing values from users.   
We have meticulously crafted three distinct types for this component to cater to various needs: text, number, and password.    
	* Text Type: This is the most basic and versatile type, allowing users to enter any characters or text strings. It offers a flexible solution for a wide range of input scenarios.
	* Number Type: Specifically designed for numeric inputs, this type restricts users to entering only numbers. It ensures data accuracy and simplifies validation for numerical data fields.
	* Password Type: Ideal for password inputs, this type masks the actual value entered by the user with dots or asterisks, enhancing security and privacy.        
  
    Furthermore we have developed numerous properties to enrich your user experience and streamline development. These properties offer fine-grained control over the appearance, behavior, and validation of the Input component, ensuring it seamlessly fits into your application's requirements.    
Here are the refined details for each property along with its respective function:   
    * **Visible**: A boolean value (true or false) that controls whether this input element is visible on the interface. Setting it to false will hide the input from the user.
    * **Disabled**: A boolean value that determines whether this input is disabled or not. If set to true, the input becomes inactive and users cannot interact with it.
    * **Readonly**: A boolean flag that specifies whether the input is read-only. When set to true, users cannot modify the input's value but can still copy and select the text.
    * **Width**: Specifies the width of the input element. The minimum acceptable value is 60, allowing for flexible sizing to accommodate different design requirements.
    * **AutoFocus**: A boolean attribute that automatically focuses the input when the page loads. Note: If multiple inputs have AutoFocus set to true, only the first one encountered in the HTML will receive focus.
    * **Placeholder**: A string value that provides a hint or sample text for the input field. This placeholder text disappears when the user clicks inside the input or starts typing.
    * **Title**: Defines the title attribute for the input element, which can be displayed as a tooltip when the user hovers over the input.
    * **InputID**: A unique identifier (id) for this input, allowing for specific targeting and styling via CSS or JavaScript.
    * **InputType**: Specifies the type of input control to display. Supported types include text (default), number, and password. Each type determines the type of data that can be entered and how it is displayed.
    * **Clearable**: A boolean attribute that indicates whether a clear button should be displayed to the right of the input. When clicked, the clear button removes all user input from the field, providing a convenient way for users to reset the input value.
    * **Value**: Sets the initial or current value of the input element. This can be used to pre-populate the input with data or to manage its state programmatically.
    * **TitleFloat**: A boolean property that controls whether the title of the input should be displayed on the left side of the input box dynamically, only when the input contains a value. This enhances user experience by providing context when the user starts typing.
    * **FixedTitle**: A boolean property that ensures the title of the input is always displayed on the left side of the input box, regardless of whether the input has a value. This is useful for descriptive or instructional titles.
    * **Required**: A boolean attribute that indicates whether the input field is required for form submission. If set to true, the form cannot be submitted without a value in this input, and an error message may be displayed if the requirement is not met.
    * **ShowErrorMsg**: A boolean attribute that controls whether error messages should be displayed visually on the page when validation fails. If set to false, error indications may still be present, but in a less obtrusive manner, such as through styling changes only.
    * **RuleErrorMsg**: A string that defines the custom error message to display when the input fails to meet the specified validation rules. This message is displayed in place of a generic error message.
    * **RequireErrorMsg**: A string that defines a custom error message specifically for required inputs when no value is provided. This allows for more tailored feedback to the user.
    * **Rules**: A set of validation rules to apply to the input. These can include regular expressions for email validation, custom functions, or any other validation logic that determines whether the input's value is acceptable.
    * **ValueChanged**: A function that can be assigned to this property. When the value of the input changes, this function is automatically triggered, allowing for dynamic updates or validation checks.
    * **OnFocus**: A function that executes when the input element gains focus. This can be used to perform actions such as displaying additional instructions or clearing the input's value.
    * **OnBlur**: A function that executes when the input element loses focus. This is useful for validating the input's value, clearing temporary UI elements, or performing other cleanup tasks.
    * **LeftAppend**: Allows for the inclusion of HTML code or elements that are appended to the left side of the input box. This can be used to add icons, buttons, or other interactive elements that enhance the input's functionality.
    * **RightAppend**: Similar to LeftAppend, but appends HTML code or elements to the right side of the input box. This provides flexibility in designing input fields with additional controls or visual elements.  

    
2. Number Input   
   This compponent is very similar as the input with type of number but it will had more settings for number input using, the following are the properties for it:  
    * **Visible**: A boolean value (true or false) that controls whether this input element is visible on the interface. Setting it to false will hide the input from the user.
    * **Readonly**: A boolean flag that specifies whether the input is read-only. When set to true, users cannot modify the input's value but can still copy and select the text.
    * **Width**: Specifies the width of the input element. The minimum acceptable value is 60, allowing for flexible sizing to accommodate different design requirements.
    * **Title**: Defines the title attribute for the input element, which can be displayed as a tooltip when the user hovers over the input.
    * **InputID**: A unique identifier (id) for this input, allowing for specific targeting and styling via CSS or JavaScript.
    * **Value**: Sets the initial or current value of the input element. This can be used to pre-populate the input with data or to manage its state programmatically.
    * **IsTitleFloat**: A boolean property that controls whether the title of the input should be displayed on the left side of the input box dynamically, only when the input contains a value. This enhances user experience by providing context when the user starts typing.
    * **Required**: A boolean attribute that indicates whether the input field is required for form submission. If set to true, the form cannot be submitted without a value in this input, and an error message may be displayed if the requirement is not met.
    * **ShowErrorMsg**: A boolean attribute that controls whether error messages should be displayed visually on the page when validation fails. If set to false, error indications may still be present, but in a less obtrusive manner, such as through styling changes only.
    * **ErrorMsg**: A string that defines the custom error message to display when the input fails to meet the specified validation rules. This message is displayed in place of a generic error message.
    * **ValueChanged**: A function that can be assigned to this property. When the value of the input changes, this function is automatically triggered, allowing for dynamic updates or validation checks.
    * **Increment**: This refers to the specified numerical amount that is added to the input number each time a button on the right is clicked. For example, if the increment value is set to 5, clicking the button will result in an addition of 5 to the current number, each and every time it is pressed.
    * **MinNumber**: This is the lowest number that can be entered or displayed in the number input field. It sets the lower boundary for the acceptable range of values.
    * **MaxNumber**: Conversely, this represents the highest number that can be entered or displayed within the number input field. It establishes the upper boundary for the valid range of values.

3. Modal  
   The Modal is use a seriel setting to show up differnt modal popups, here are the details about each setting:  
   * **HeaderTemplate**: Allows for the inclusion of HTML code or elements that are appended to the header of the modal.
   * **BodyTemplate**: Allows for the inclusion of HTML code or elements that are appended to the body of the modal.
   * **FooterTemplate**: Allows for the inclusion of HTML code or elements that are appended to the footer of the modal.
   * **Visible**: property to control the modal shows up or not
   * **VisibleChanged**: A function that can be assigned to this property. When the value of the visible changes, this function is automatically triggered, allowing for dynamic updates or validation checks or anything else you want to do.
   * **Size**: Setting for the size for this modal, it can be "ModalSettings.Small", "ModalSettings.Normal","ModalSettings.Large" and "ModalSettings.XLarge"
   * **Title**: Setting for the title for this modal
   * **CloseBtnVisible**: True or False, to control if the close button visible or not
   * **HeaderVisible**:True or False, to control if the header visible or not
   * **FooterVisible**:True or False, to control if the footer visible or not
   * **ClickOutsideToClose**: True or False, to control if the modal close when user click the outside place
   * **FooterBottons**: Setting for you to add a list of ModalButton there to show up in Footer of this modal
   * **OnDialogButtonClicked**:A function that can be assigned to this property. When related button click a serial event trigger and run.
   

4. Radio Group  
This component comprises a group of radio boxes, offering flexibility in how they are displayed: either inline for a compact view or vertically for clarity. Additionally, you have the option to customize the appearance of the buttons within these radio boxes in three distinct styles:

   * Standard Radio Button: The traditional circular button with a dot indicator for selection.
   * Toggle Button: A custom, interactive button designed to toggle between a checked (selected) and unchecked (unselected) state, offering a visually appealing alternative to traditional radio buttons.
   * Switch Button: A sliding switch design, commonly used for binary choices, providing a clear visual representation of the on/off or selected/unselected state.  

     Here are the key properties related to the radio group component (Including MPRadioGroup and MPRadioOption), which provide customization options for both its display and functionality:  
     **MPRadioGroup**:    
    * **ChildContent**: Permits the seamless integration of HTML code or elements, which can be appended to the individual items within the group, typically achieved through the use of MPRadioOption or similar components. This feature enhances the flexibility and customizability of the radio group, allowing for the inclusion of additional information, styling, or interactive elements alongside each option.
    * **Name**: Configuration option for specifying the unique name of the radio group. This setting is crucial for ensuring proper functionality and differentiation between multiple radio groups on the same page, allowing users to make independent selections within each group.
    * **DisplayInline**: True or False, a setting to determine whether radio groups are displayed in an inline (horizontal) arrangement or a vertical stack. This option allows for customization of the layout, catering to different design preferences and ensuring that radio groups fit seamlessly within the overall user interface.
    * **DisplayMode**: A configuration option for customizing the display style of buttons within the radio group. The available values include "DisplayModes.DefaultButton" for the standard button appearance, "DisplayModes.ToggleButton" for a custom-style button that indicates an selected or unselected state, and "DisplayModes.SwitchButton" for a sliding switch button that provides a more intuitive and interactive user experience. This setting enhances the visual appeal and usability of the radio group, allowing for a more tailored design that matches the overall look and feel of the application.
    * **Value**: A configuration option that specifies the default selected value for the radio group. This setting ensures that when the group is first rendered, one of the radio buttons is automatically selected, based on the predefined value. This feature is useful for pre-populating forms or indicating a recommended or default option to users.
    * **Datasource**: A configuration option that allows for the binding of a data source to the radio group, where the data source is of the Dictionary<string, string> type. This feature enables dynamic population of the radio group options, with each key-value pair representing a unique radio button option. The keys serve as the values for the radio buttons, while the values can be used as display labels or additional metadata associated with each option. This approach simplifies the process of managing and updating radio group options, especially in scenarios where the options are sourced from a database or external data source.
    * **ValueChanged**: A function that can be assigned to this property. When the selected value of the radio group changes, this function is automatically triggered, allowing for dynamic updates or validation checks.
      
      **MPRadioOption**:  
    * **Description**: Customizing the Label Name for the Radio Button Option
    * **Value**: Specifying the Default Selected Option within Radio Button Groups.
    * **ButtonClass**:  Custom Class Configuration for the Button when Display Mode is Set to "DisplayModes.ToggleButton"


5. Checkbox Group  
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

6. Tab Group  
This component is designed to display a flexible or static group of tabs on the page, providing you with the freedom to choose based on your preferences.
     Here are the key properties related to the tab group component (Including MPTabGroup and MPTabOption), which provide customization options for both its display and functionality:  
     **MPTabGroup**:    
    * **ChildContent**: Permits the seamless integration of HTML code or elements, which can be appended to the individual items within the group, typically achieved through the use of MPTabOption or similar components. This feature enhances the flexibility and customizability of the tab group, allowing for the inclusion of additional information, styling, or interactive elements alongside each option.
    * **ShowTabs**:  To identify whether the tabs should be displayed or not, a Boolean value (True or False) is used, with the default value typically set to True to ensure that the tabs are shown by default.
    * **NeedDeleteConfirm**: The setting utilizes a True or False value to specify whether a confirmation popup should appear when attempting to delete a tab from the group.
    * **SelectedTabHeadText**: Configuration for the default selected tab.
    * **SelectedTabHeadTextChanged**: A function that can be assigned to this property. When the selected tab of the group changes, this function is automatically triggered, allowing for dynamic updates or validation checks etc..
      
    **MPTabOption**:  
    * **ItemID**: Configuration for id for each tab option.
    * **Header**: Configuration for the text displayed on the tab.
    * **Icon**: Defines the HTML code for the icon to be displayed within the tab header.
    * **HeaderTemplate**: Allows for the inclusion of HTML code or elements that are appended to the header of the tab.
    * **Active**:  The "active" status of a tab can be enabled or disabled by setting it to True or False, respectively. If multiple tabs are configured as active, the system will prioritize the first one and make it active, ensuring only one tab is active at a given time.
    * **OnAfterActivateTab**:  A function that can be assigned to this property. When the active tab, this function is automatically triggered, allowing for dynamic updates or do some other events.
    * **OnCloseTab**:  A function that can be assigned to this property. When the close the tab, this function is automatically triggered, allowing for dynamic updates or do some other events.
    * **Closable**:  To identify whether a tab can be closed or not, a True or False value is used. Setting this to True allows the tab to be closed, while False disables the closing functionality.
   * **ChildContent**: Permits the seamless integration of HTML code or elements, which can be appended to the individual option. This feature enhances the flexibility and customizability of the tab option, allowing for the inclusion of additional information, styling, or interactive elements alongside this option.
    
