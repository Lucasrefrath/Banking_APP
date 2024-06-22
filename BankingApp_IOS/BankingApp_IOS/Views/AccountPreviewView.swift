//
//  AccountPreview.swift
//  BankingApp_IOS
//
//  Created by Lucas Hermes on 15.06.24.
//

import Foundation
import SwiftUI

struct AccountPreviewView: View {
    
    let accountDetail: AccountDetailsModel
    
    var body: some View {
        NavigationLink(destination: AccountPage(accountDetails: accountDetail)) {
            ZStack(alignment: .topLeading) {
                // Background
                LinearGradient(gradient: Gradient(colors: [Color.blue, Color.cyan]), startPoint: .topLeading, endPoint: .bottomTrailing)
                    .cornerRadius(15)
                    .shadow(radius: 5)
                
                VStack(alignment: .leading) {
                    // Top icon and amount
                    HStack {
                        Text(accountDetail.name)
                            .font(.callout)
                            .foregroundColor(.white)
                        Spacer()
                    }
                    .padding([.top, .leading, .trailing])
                    
                    HStack {
                        Text("$")
                            .font(.largeTitle)
                            .foregroundColor(.white)
                        + Text(accountDetail.balance.description)
                            .font(.largeTitle)
                            .foregroundColor(.white)
                        
                        Spacer()
                    }
                    .padding([.leading, .trailing])
                    
                    
                    Spacer()
                    
                    // Card number and logo
                    
                    HStack {
                        Circle()
                            .foregroundColor(.white)
                            .frame(width: 10, height: 10)
                        Circle()
                            .foregroundColor(.white)
                            .frame(width: 10, height: 10)
                    }
                    .padding([.leading])
                    
                    
                    VStack(alignment: .leading) {
                        HStack {
                            Text(accountDetail.iban)
                                .foregroundColor(.white)
                                .font(.headline)
                            
                            Spacer()
                            
                            Image(systemName: "wave.3.forward.circle.fill")
                                .foregroundColor(.white)
                                .font(.title)
                        }
                        .padding([.leading, .trailing, .bottom])
                    }
                }
            }
            .frame(width: 350, height: 200)
        }
    }
}
