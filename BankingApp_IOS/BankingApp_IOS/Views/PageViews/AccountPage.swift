//
//  AccountPage.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 21.06.24.
//

import SwiftUI

struct AccountPage: View {
    
    let accountDetails: AccountDetailsModel
    
    var body: some View {
        Text(accountDetails.iban)
    }
}
